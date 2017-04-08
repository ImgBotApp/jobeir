import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { wysiwig } from '../../themes/wysiwig-theme';

export class Wysiwyg extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.Editor.focusEditor();
  }

  render() {
    const { meta } = this.props;
    const showError = meta.touched && meta.error && meta.invalid;

    return (
      <InputWrapper {...this.props}>
        <EditorContainer
          showError={showError}
          onClick={this.handleClick}
        >
          <Editor
            {...this.props.input}
            toolbar={wysiwig}
            placeholder="Job description..."
            ref={(editor) => { this.Editor = editor; }}
          />
        </EditorContainer>
      </InputWrapper>
    );
  }
};

const EditorContainer = styled.div`
  border-radius: 3px;
  border: 1px solid #babbbb;
  padding: 10px;
  min-height: 300px;
  border-color: ${props => props.showError ? '#cc0726' : ''};
`;