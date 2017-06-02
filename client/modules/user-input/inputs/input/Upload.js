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
