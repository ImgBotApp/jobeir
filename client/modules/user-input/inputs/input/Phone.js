import React from 'react';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';
import InputWrapper from '../components/InputWrapper';

export const Phone = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <StyledMaskedInput
        {...props.input}
        type="tel"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
        guide={false}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    </InputWrapper>
  );
};


const StyledMaskedInput = styled(MaskedInput)`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  border-color: ${props => props.showError ? props.theme.error.color : ''};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  margin: ${props => props.theme.input.margin};

  &:active,
  &:focus {
    border-color:  ${props => props.showError ? props.theme.error.color : props.theme.input.activeBorderColor};
    outline: none;
  }

  ::-webkit-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
  }
  :-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity:  1;
  }
  ::-moz-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
    opacity:  1;
  }
  :-ms-input-placeholder {
    font-size: ${props => props.theme.input.fontSize};
    color: ${props => props.theme.input.ph.color};
  }
`;