import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

export const Radio = props => {
  const { meta, ...rest } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  if (props.type === 'yes/no') {
    return (
      <InputWrapper {...rest}>
        <RadioContainer>
          {props.options.map(option => (
            <RadioInputContainer key={option.value}>
              <RadioInput
                {...props.input}
                type="radio"
                id={props.input.name}
                name={props.input.name}
                value={option.value}
                showError={showError}
                checked={option.value === props.input.value}
              />
              <RadioText showError={showError}>
                {option.text}
              </RadioText>
            </RadioInputContainer>
          ))}
        </RadioContainer>
      </InputWrapper>
    );
  }

  if (props.type === 'list') {
    return (
      <InputWrapper {...rest}>
        <RadioListContainer>
          {props.options.map(option => {
            /**
             * We're allowing for objects to be passed in as value to these select
             * option input fields. To do so, the object must be JSON (a string)
             * to be stored within the HTML elelent
             */
            const val = typeof option.value === 'object'
              ? JSON.stringify(option.value)
              : option.value;

            // allowing re-assignment of the value if it's address input
            let checked = val === props.input.value;

            if (props.input.name === 'address') {
              checked =
                option.value.postal_code === props.input.value.postal_code;
            }

            return (
              <RadioListInputContainer
                checked={checked}
                key={val}
                row={props.row}
              >
                <RadioListInput
                  {...props.input}
                  type="radio"
                  id={props.input.name}
                  name={props.input.name}
                  value={val}
                  data-val={JSON.stringify(option.value)}
                  showError={showError}
                  checked={checked}
                />
                <RadioListText checked={checked} showError={showError}>
                  {option.name}
                </RadioListText>
              </RadioListInputContainer>
            );
          })}
        </RadioListContainer>
      </InputWrapper>
    );
  }

  throw new Error(
    'Remember to pass the prop "type" to Radio as list or yes/no'
  );
};

const RadioContainer = styled.div`
  display: flex;
`;

const RadioInputContainer = styled.div`
  position: relative;
  margin: 2rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-left: 2rem;
  }

  input[type=radio]:checked {
    background: ${props => props.theme.colors.blue};
    border-color: ${props => props.theme.colors.blue};
  }

  input[type=radio]:checked ~ div {
    color: white;
  }
`;

const RadioInput = styled.input`
  border-radius: ${props => props.theme.input.borderRadius};
  border: ${props => props.theme.input.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  margin: ${props => props.theme.input.margin};
  max-width: ${props => props.theme.input.maxWidth};
  
  &:active,
  &:focus {
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.input.activeBorderColor)};
  }

  position: absolute;
  -webkit-appearance: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const RadioText = styled.div`
  position: relative;
  top: 2px;
  pointer-events: none;
  color: ${props => (props.showError ? props.theme.error.color : props.theme.text)};
`;

/**
 * Radio List version styles
 */
const RadioListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
  border-radius: 3px;
`;

const RadioListInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.row === 'full' ? '' : 'center')};
  flex-basis: ${props => (props.row === 'full' ? '100%' : '49.5%')};
  padding: 20px;
  background:  ${props => (props.checked ? '#f27c5e' : '#f9f8f7')};
  color:  ${props => (props.checked ? '#fff' : 'rgba(0,0,0,0.8)')};
  border-radius: 2px;
  margin-bottom: 1%;
  cursor: pointer;

  input[type=radio]:checked {
    background: ${props => props.theme.colors.blue};
    border-color: ${props => props.theme.colors.blue};
  }

  input[type=radio]:checked ~ div {
    color: white;
  }
`;

const RadioListInput = styled.input`
  -webkit-appearance: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background:  ${props => (props.checked ? '#f27c5e' : '#f9f8f7')};
  color:  ${props => (props.checked ? '#fff' : 'rgba(0,0,0,0.8)')};
  border-radius: 2px;
  margin-bottom: 1%;
  cursor: pointer;

  
  &:active,
  &:focus {
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.input.activeBorderColor)};
  }
`;

const RadioListText = styled.div`
  position: relative;
  top: 2px;
  pointer-events: none;
  color: ${props => (props.showError ? props.theme.error.color : props.theme.text)};
`;
