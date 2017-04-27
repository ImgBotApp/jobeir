import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

export const Textarea = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <TextareaInput
        {...props.input}
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
      />
    </InputWrapper>
  );
};

const TextareaInput = styled.textarea`
  border-radius: ${props => props.theme.textarea.borderRadius};
  border: ${props => props.theme.textarea.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.textarea.padding};
  font-size: ${props => props.theme.textarea.fontSize};
  width: ${props => props.theme.textarea.width};
  margin: ${props => props.theme.textarea.margin};
  max-width: ${props => props.theme.textarea.maxWidth};
  min-height: ${props => props.theme.textarea.minHeight};
  line-height: 1.5;
  
  &:active,
  &:focus {
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.textarea.activeBorderColor)};
    outline: none;
  }

  ::-webkit-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    line-height: 1.5;
  }
  :-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity:  1;
    line-height: 1.5;
  }
  ::-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity:  1;
    line-height: 1.5;
  }
  :-ms-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    line-height: 1.5;
  }
`;
