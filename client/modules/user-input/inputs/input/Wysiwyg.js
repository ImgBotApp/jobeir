import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromRaw } from "draft-js"
import styled from 'styled-components';
import { wysiwig } from '../../themes/wysiwig-theme';

/**
 * Wysiwyg
 * Based on Draft JS, a third party react component pulled in to
 * be used to allow users to write a company description within
 * the job and company process.
 */
export class Wysiwyg extends Component {
  constructor(props) {
    super(props);
    const { input } = props;
    let editorState;

    if (input.value.blocks) {
      editorState = EditorState.createWithContent(convertFromRaw(input.value));
    }
    else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };

    this.handleClick = this.handleClick.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  /**
   * Used to fake making the Editor seem bigger than it is because
   * the styling does not play very well with styled-components
   */
  handleClick() {
    this.Editor.focusEditor();
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  render() {
    const { meta , input} = this.props;
    const showError = meta.touched && meta.error && meta.invalid;

    return (
      <InputWrapper {...this.props}>
        <EditorContainer
          showError={showError}
          onClick={this.handleClick}
        >
          <Editor
            {...input}
            toolbar={wysiwig}
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
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
  padding: 18px;
  min-height: 300px;
  margin: 0 auto 1rem;
  border-color: ${props => props.showError ? '#cc0726' : ''};

  .rdw-editor-toolbar {
    padding-bottom: 10px;
  }

  .rdw-editor-toolbar,
  .rdw-inline-wrapper,
  .rdw-list-wrapper {
    display: flex;
  }

  .rdw-option-wrapper {
    padding-right: 10px;
    margin-right: 5px;
    cursor: pointer;
  }
`;