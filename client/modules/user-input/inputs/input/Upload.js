// @flow
import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { UploadIcon } from '../../../../icons/';

const activeStyle = {
  borderColor: '#5C6AC4',
  background: 'rgba(92, 106, 196, 0.04)'
};

/**
 * <Upload />
 * Used to upload static files, specifically company logos to the backend
 * and process all information required. Using Dropzone for better UX
 * and easier implementation.
 * 
 * We are passing the handler functions down into this component instead
 * of declaring them within this upload function. This is on purpose. It
 * makes it more customizable depending on the form requirements.
 */
export class Upload extends Component {
  state: {
    preview: string,
    name: string
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      preview: '',
      name: ''
    };
  }

  handleDropAccepted = (files: Array<{ preview: string, name: string }>) => {
    this.setState({
      preview: files[0].preview,
      name: files[0].name.split(' ').join('')
    });
  };

  handleDropRejected = (files: Array<{ preview: string, name: string }>) => {
    console.log(files);
  };

  render() {
    const { name, preview } = this.state;

    return (
      <InputWrapper>
        <StyledDropzone
          accept="image/jpeg, image/png"
          maxSize={2097152}
          name={this.props.name}
          onDrop={this.props.handleOnDrop}
          onDropAccepted={this.handleDropAccepted}
          onDropRejected={this.handleDropRejected}
          activeStyle={activeStyle}
        >
          <DropZoneInner>
            {preview ? (
              <DropZoneImgContainer>
                <DropZoneImg src={preview} alt={name} />
                {name}
              </DropZoneImgContainer>
            ) : (
              <DropZoneButtonContainer>
                <DropZoneButton>
                  <UploadIcon />
                  <DropZoneButtonText>
                    {this.props.buttonText}
                  </DropZoneButtonText>
                </DropZoneButton>
                or drag and drop
              </DropZoneButtonContainer>
            )}
          </DropZoneInner>
        </StyledDropzone>
      </InputWrapper>
    );
  }
}

const StyledDropzone = styled(Dropzone)`
  display: ${props => props.theme.dropzone.display};
  align-items: ${props => props.theme.dropzone.alignItems};
  justify-content: ${props => props.theme.dropzone.justifyContent};
  border-radius: ${props => props.theme.dropzone.borderRadius};
  border: ${props => props.theme.dropzone.border};
  font-size: ${props => props.theme.dropzone.fontSize};
  width: ${props => props.theme.dropzone.width};
  min-height: ${props => props.theme.dropzone.minHeight};
  margin: ${props => props.theme.dropzone.margin};
  background: ${props => props.theme.dropzone.background};
  cursor: ${props => props.theme.dropzone.cursor};

  &:hover: {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.dropzone.activeBorderColor};
  }
`;

const DropZoneInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const DropZoneButtonContainer = styled.div``;

const DropZoneButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.purple};
  color: white;
  border-radius: 3px;
  height: 50px;
  width: 100%;
  font-size: 18px;
  width: 194px;
  cursor: pointer;
  opacity: 1;
  margin-bottom: 10px;
`;

const DropZoneButtonText = styled.div`margin-left: 10px;`;

const DropZoneImgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropZoneImg = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;
