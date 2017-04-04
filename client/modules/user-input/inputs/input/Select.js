import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

const handlePropsError = options => {
  if (!options && !Array.isArray(options)) {
    throw new Error('Select component requires an array of options passed as an options prop')
  }
}

export const Select = props => {
  handlePropsError(props.options);

  return (
    <InputWrapper {...props}>
      <SelectInput
        {...props.input}
        id={props.input.name}
        name={props.input.name}
      >
        {props.options.map(option => <option key={option.value}>{option.name}</option>)}
      </SelectInput>
    </InputWrapper>
  );
};

const SelectInput = styled.select`

`;