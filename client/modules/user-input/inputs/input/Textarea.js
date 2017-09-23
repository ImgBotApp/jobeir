// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import InputWrapper from '../components/InputWrapper';

export const Textarea = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

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
  font-family: ${props => props.theme.textarea.fontFamily};
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
  outline: none;
  box-shadow: none;
  appearance: none;

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.textarea.activeBorderColor};
    outline: none;
  }

  ${media.tablet`
    font-size: 16px;
    padding: 14px;
  `};

  ::-webkit-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    line-height: 1.5;
    ${media.tablet`
      font-size: 16px;
    `};
  }
  :-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
    line-height: 1.5;
    ${media.tablet`
      font-size: 16px;
    `};
  }
  ::-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity: 1;
    line-height: 1.5;
    ${media.tablet`
      font-size: 16px;
    `};
  }
  :-ms-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    line-height: 1.5;
    ${media.tablet`
      font-size: 16px;
    `};
  }
`;
