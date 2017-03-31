import React from 'react';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import InputWrapper from '../components/InputWrapper';

const numberMask = createNumberMask({
  prefix: '$',
})

export const Currency = props => {
  return (
    <InputWrapper {...props}>
      <StyledMaskedInput
        {...props.input}
        id={props.input.name}
        name={props.input.name}
        mask={numberMask}
      />
    </InputWrapper>
  );
};

const StyledMaskedInput = styled(MaskedInput)`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  margin: ${props => props.theme.input.margin};

  &:active,
  &:focus {
    border-color:  ${props => props.theme.input.activeBorderColor};
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