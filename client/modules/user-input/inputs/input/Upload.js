import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { uploadCompanyLogo } from '../../../create/company/sagas/';

export class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleDropAccepted = this.handleDropAccepted.bind(this);
    this.state = {
      preview: '',
      name: ''
    };
  }

  handleDropAccepted(files) {
    console.log(files);
    this.setState({
      preview: files[0].preview,
      name: files[0].name
    });
  }

  render() {
    const files = this.props.input.value;
    return (
      <div>
        <StyledDropzone
          accept="image/*"
          maxSize={2097152}
          name={this.props.name}
          onDrop={this.props.handleOnDrop}
          onDropAccepted={this.handleDropAccepted}
          activeStyle={activeStyle}
        >
          <DropZoneInner>

            {this.state.preview
              ? <DropZoneImgContainer>
                  <DropZoneImg src={this.state.preview} alt={this.state.name} />
                  {this.state.name}
                </DropZoneImgContainer>
              : <div>
                  <DropZoneButton>
                    {UploadIcon()}
                    <DropZoneButtonText>
                      Upload photos
                    </DropZoneButtonText>
                  </DropZoneButton>
                  or drag them in
                </div>}

          </DropZoneInner>
        </StyledDropzone>
        {files &&
          Array.isArray(files) &&
          <ul>
            {files.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>}
      </div>
    );
  }
}

const activeStyle = {
  borderColor: '#fb5032'
};

const StyledDropzone = styled(Dropzone)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.dropzone.borderRadius};
  border: ${props => props.theme.dropzone.border};
  font-size: ${props => props.theme.dropzone.fontSize};
  width: ${props => props.theme.dropzone.width};
  min-height: ${props => props.theme.dropzone.minHeight};
  margin: ${props => props.theme.dropzone.margin};
  max-width: ${props => props.theme.dropzone.maxWidth};
  cursor: pointer;
  
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

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24px"
    height="24px"
    viewBox="0 0 48 48"
  >
    <g transform="translate(0, 0)">
      <line
        data-cap="butt"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="24"
        y1="36"
        x2="24"
        y2="20"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polyline
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points="18,26 24,20 
  30,26 "
        strokeLinejoin="miter"
      />
      <path
        data-color="color-2"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        d="M32,38h6
  c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8c0,0,0,0-0.1,0c-0.5-7.8-7-14-14.9-14C15,8,8.4,14.3,8,22.3c-3.5,0.9-6,4-6,7.7c0,4.4,3.6,8,8,8h6"
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);
