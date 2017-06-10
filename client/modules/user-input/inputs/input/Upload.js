import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { UploadIcon } from '../../../../icons/';

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleDropAccepted = this.handleDropAccepted.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
    this.state = {
      preview: '',
      name: ''
    };
  }

  handleDropAccepted(files) {
    this.setState({
      preview: files[0].preview,
      name: files[0].name
    });
  }

  handleDropRejected(files) {
    console.log(files);
  }

  render() {
    const files = this.props.input.value;
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
            {preview
              ? <DropZoneImgContainer>
                  <DropZoneImg src={preview} alt={name} />
                  {name}
                </DropZoneImgContainer>
              : <DropZoneButtonContainer>
                  <DropZoneButton>
                    <UploadIcon />
                    <DropZoneButtonText>
                      {this.props.buttonText}
                    </DropZoneButtonText>
                  </DropZoneButton>
                  or drag and drop
                </DropZoneButtonContainer>}
          </DropZoneInner>
        </StyledDropzone>
      </InputWrapper>
    );
  }
}

const activeStyle = {
  borderColor: '#fb5032'
};

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
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.dropzone.activeBorderColor)};
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
  background: ${props => props.theme.colors.red};
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

const DropZoneButtonText = styled.div`
  margin-left: 10px;
`;

const DropZoneImgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropZoneImg = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;
