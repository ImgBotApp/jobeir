import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

/**
 * An internal error handler to make sure we always pass
 * the Select component Field an array of options
 */
const handlePropsError = options => {
  if (!options && !Array.isArray(options)) {
    throw new Error(
      'Select component requires an array of options passed as an options prop',
    );
  }
};

export const Select = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  handlePropsError(props.options);

  return (
    <InputWrapper {...props}>
      <SelectContainer>
        <SelectInput
          {...props.input}
          id={props.input.name}
          name={props.input.name}
          showError={showError}
          visited={meta.visited}
        >
          {props.options.map(option => (
            <OptionInput disabled={option.disabled} key={option.value}>
              {option.name}
            </OptionInput>
          ))}
        </SelectInput>
        <SelectArrow />
      </SelectContainer>
    </InputWrapper>
  );
};

const SelectContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 10px;
    right: 16px;
  }
`;

const SelectInput = styled.select`
  background: ${props => props.theme.select.background};
  border-radius: ${props => props.theme.select.borderRadius};
  border: ${props => props.theme.select.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.select.padding};
  font-size: ${props => props.theme.select.fontSize};
  width: ${props => props.theme.select.width};
  margin: ${props => props.theme.select.margin};
  max-width: ${props => props.theme.select.maxWidth};
  color: ${props => (props.visited ? '#484848' : '#989898')};
  
  &:active,
  &:focus {
    border-color: ${props => (props.showError ? props.theme.error.color : props.theme.select.activeBorderColor)};
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;

  option[value=""][disabled] {
    display: none;
  }
`;

const OptionInput = styled.option`
  &:first-child {
    color: red;
  }
`;

const SelectArrow = () => (
  <svg
    fill="#676767"
    width="36"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10l5 5 5-5z" /><path d="M0 0h24v24H0z" fill="none" />
  </svg>
);
