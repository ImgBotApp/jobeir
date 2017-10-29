// @flow
import React from 'react';
import styled from 'styled-components';
import InputWrapper from '../components/InputWrapper';

/**
 * An internal error handler to make sure we always pass
 * the Select component Field an array of options
 */
const handlePropsError = (options: Array<{}>) => {
  if (!options && !Array.isArray(options)) {
    throw new Error(
      'Select component requires an array of options passed as an options prop'
    );
  }
};

export const Select = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

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
          {props.options.map(option => {
            /**
             * We're allowing for objects to be passed in as value to these select
             * option input fields. To do so, the object must be JSON (a string)
             * to be stored within the HTML elelent
             */
            const val =
              typeof option.value === 'object'
                ? JSON.stringify(option.value)
                : option.value;

            return (
              <OptionInput
                disabled={option.disabled}
                key={val}
                value={val}
                data-value={val}
              >
                {option.name}
              </OptionInput>
            );
          })}
        </SelectInput>
        <SelectArrow />
      </SelectContainer>
    </InputWrapper>
  );
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    top: ${props =>
      props.theme.select.svg.top ? props.theme.select.svg.top : '10px'};
    right: 16px;
  }
`;

const SelectInput = styled.select`
  appearance: none;
  background: ${props => props.theme.select.background};
  border-radius: ${props => props.theme.select.borderRadius};
  border: ${props => props.theme.select.border};
  border-color: ${props => (props.showError ? props.theme.error.color : '')};
  padding: ${props => props.theme.select.padding};
  line-height: ${props => props.theme.select.lineHeight};
  font-size: ${props => props.theme.select.fontSize};
  width: ${props => props.theme.select.width};
  height: ${props => props.theme.select.height};
  margin: ${props => props.theme.select.margin};
  max-width: ${props => props.theme.select.maxWidth};
  color: ${props => (props.visited ? 'rgba(0,0,0,0.85)' : '#989898')};

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.select.activeBorderColor};
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;

  option[value=''][disabled] {
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
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);
