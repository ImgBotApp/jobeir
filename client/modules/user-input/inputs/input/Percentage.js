// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import InputWrapper from '../components/InputWrapper';

const numberMask = createNumberMask({
  prefix: '',
  suffix: '%',
  allowDecimal: true,
  integerLimit: 3
});

export const Percentage = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta, input, placeholder } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <StyledMaskedInput
        {...input}
        id={input.name}
        name={input.name}
        placeholder={placeholder}
        showError={showError}
        mask={numberMask}
        guide={false}
      />
    </InputWrapper>
  );
};

const StyledMaskedInput = styled(MaskedInput)`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  height: ${props => props.theme.input.height};
  margin: ${props => props.theme.input.margin};
  appearance: none;
  box-shadow: none;

  ${media.tablet`
    font-size: 16px;
    height: 48px;
    padding: 16px 14px 12px;
  `};

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.input.activeBorderColor};
  }

  ::-webkit-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    ${media.tablet`
      font-size: 16px;
    `};
  }
  :-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    ${media.tablet`
      font-size: 16px;
    `};
    opacity: 1;
  }
  ::-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    ${media.tablet`
      font-size: 16px;
    `};
    opacity: 1;
  }
  :-ms-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    ${media.tablet`
      font-size: 16px;
    `};
  }
`;
