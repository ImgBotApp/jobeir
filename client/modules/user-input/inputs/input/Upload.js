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
        <Dropzone name={this.props.name} onDrop={this.handleDrop} />
        {files &&
          Array.isArray(files) &&
          <ul>
            {files.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>}
      </div>
    );
  }
}

export const UploadInput = styled.input`
  border-radius: ${props => props.theme.input.borderRadius};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  margin: ${props => props.theme.input.margin};
  max-width: ${props => props.theme.input.maxWidth};
  
  &:hover: {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }
  
  &:active,
  &:focus {
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.input.activeBorderColor)};
  }

  ::-webkit-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
  }
  :-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity:  1;
  }
  ::-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity:  1;
  }
  :-ms-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
  }
`;
