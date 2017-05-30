import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export class Upload extends Component {
  // constructor(props) {
  //   super(props);
  //   this.onChange = this.onChange.bind(this);
  // }

  // onChange(e) {
  //   const { input: { onChange } } = this.props;
  //   onChange(e.target.files[0]);
  // }

  render() {
    const files = this.props.input.value;
    return (
      <div>
        <Dropzone
          name={this.props.name}
          onDrop={(filesToUpload, e) =>
            this.props.input.onChange(filesToUpload)}
        >
          <div>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
        {this.props.meta.touched &&
          this.props.meta.error &&
          <span className="error">{this.props.meta.error}</span>}
        {files &&
          Array.isArray(files) &&
          <ul>
            {files.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>}
      </div>
    );

    // const { meta } = this.props;
    // delete this.props.input.value;
    // const showError = meta.touched && meta.error && meta.invalid;

    // return (
    //   <InputWrapper {...this.props}>
    //     <UploadInput
    //       {...this.props.input}
    //       type="file"
    //       id={this.props.input.name}
    //       name={this.props.input.name}
    //       onChange={this.onChange}
    //       placeholder={this.props.placeholder}
    //       showError={showError}
    //     />
    //   </InputWrapper>
    // );
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
