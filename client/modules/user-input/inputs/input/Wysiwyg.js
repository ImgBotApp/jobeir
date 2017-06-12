import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
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
    } else {
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
      editorState
    });
  }

  render() {
    const { meta, input } = this.props;
    const showError = meta.touched && meta.error && meta.invalid;

    return (
      <InputWrapper {...this.props}>
        <EditorContainer showError={showError} onClick={this.handleClick}>
          <Editor
            {...input}
            toolbar={wysiwig}
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
            ref={editor => {
              this.Editor = editor;
            }}
          />
        </EditorContainer>
      </InputWrapper>
    );
  }
}

const EditorContainer = styled.div`
  border-radius: 3px;
  border: 1px solid #babbbb;
  padding: 20px;
  min-height:  ${props => (props.minHeight ? props.minHeight : '300px')};
  margin: 0 auto 1rem;
  border-color: ${props => (props.showError ? '#f73c3c' : '')};

  .rdw-editor-toolbar {
    margin: -8px 0 0 -10px;
  }

  .rdw-editor-toolbar,
  .rdw-inline-wrapper,
  .rdw-list-wrapper {
    display: flex;
  }

  .rdw-option-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    margin: 0px 2px;
    cursor: pointer;
  }

  .rdw-option-active {
    background: ${props => props.theme.colors.pink};
    color: white;
    border-radius: 4px;
  }

  .DraftEditor-root {
    line-height: 1.5;
  }

  .public-DraftStyleDefault-block {
    margin: 0.5em 0;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 1.25em;
  }

  .rdw-emoji-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    margin-bottom: 6px;
    position: relative;
  }
  .rdw-emoji-modal {
    overflow: auto;
    position: absolute;
    top: 35px;
    left: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    width: 235px;
    height: 180px;
    border: 1px solid #F1F1F1;
    padding: 15px;
    border-radius: 2px;
    z-index: 100;
    background: white;
    box-shadow: 3px 3px 5px #BFBDBD;
  }
  .rdw-emoji-icon {
    margin: 2.5px;
    height: 24px;
    width: 24px;
    cursor: pointer;
    font-size: 22px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
`;
