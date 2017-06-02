import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(files) {
    const file = files[0];
    const formData = new FormData();
    formData.append('logo', file);

    fetch('/api/v0/upload', {
      headers: {
        enctype: 'multipart/form-data'
      },
      method: 'POST',
      body: formData
    });
  }

  render() {
    const files = this.props.input.value;
    return (
      <div>
        <StyledDropzone
          accept="image/*'"
          maxSize={2097152}
          name={this.props.name}
          onDrop={this.handleDrop}
        />
        {files &&
          Array.isArray(files) &&
          <ul>
            {files.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>}
      </div>
    );
  }
}

export const StyledDropzone = styled(Dropzone)`
  border-radius: ${props => props.theme.dropzone.borderRadius};
  border: ${props => props.theme.dropzone.border};
  font-size: ${props => props.theme.dropzone.fontSize};
  width: ${props => props.theme.dropzone.width};
  min-height: ${props => props.theme.dropzone.minHeight};
  margin: ${props => props.theme.dropzone.margin};
  max-width: ${props => props.theme.dropzone.maxWidth};
  
  &:hover: {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }
  
  &:active,
  &:focus {
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.dropzone.activeBorderColor)};
  }
`;

class FullScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      accept: '',
      files: [],
      dropzoneActive: false
    };
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }

  render() {
    const { accept, files, dropzoneActive } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };
    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        {dropzoneActive && <div style={overlayStyle}>Drop files...</div>}
        <div>
          <h1>My awesome app</h1>
          <label htmlFor="mimetypes">
            Enter mime types you want to accept:{' '}
          </label>
          <input
            type="text"
            id="mimetypes"
            onChange={this.applyMimeTypes.bind(this)}
          />

          <h2>Dropped files</h2>
          <ul>
            {files.map(f => <li>{f.name} - {f.size} bytes</li>)}
          </ul>

        </div>
      </Dropzone>
    );
  }
}
