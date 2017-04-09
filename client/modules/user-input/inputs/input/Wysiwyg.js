import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Used to fake making the Editor seem bigger than it is because
   * the styling does not play very well with styled-components
   */
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
`;