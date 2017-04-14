
import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

const func = () => console.log('fired')

export const Radio = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <RadioContainer>
        {
          props.options.map(option =>
            <RadioInputContainer>
              <RadioInput
                onClick={func}
                {...props.input}
                type="radio"
                key={option.value}
                id={props.input.name}
                name={props.input.name}
                value={option.text}
              />
              <RadioText>
                {option.text}
              </RadioText>
            </RadioInputContainer>
          )
        }
      </RadioContainer>
    </InputWrapper>
  );
};
const RadioContainer = styled.div`
  display: flex;
`;

const RadioInputContainer = styled.div`
  position: relative;
  margin: 2.4rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-left: 2rem;
  }

  input[type=radio]:checked {
    background: ${props => props.theme.blue};
    border-color: ${props => props.theme.blue};
  }

  input[type=radio]:checked ~ div {
    color: white;
  }
`;

const RadioInput = styled.input`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  border-color: ${props => props.showError ? props.theme.error.color : props.theme.text};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  margin: ${props => props.theme.input.margin};
  max-width: ${props => props.theme.input.maxWidth};
  
  &:active,
  &:focus {
    border-color: ${props => props.showError
      ? props.theme.error.color
      : props.theme.input.activeBorderColor
    };
    outline: none;
  }

  position: absolute;
  -webkit-appearance: none;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  cursor: pointer;
`;

const RadioText = styled.div`
  position: relative;
  top: 2px;
  pointer-events: none;
`;