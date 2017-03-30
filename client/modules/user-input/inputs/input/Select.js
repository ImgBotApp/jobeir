import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

export const Select = props => {
  return (
    <InputWrapper {...props}>
      <SelectInput
        {...props.input}
        id={props.input.name}
        name={props.input.name}
      >
        <option />
      </SelectInput>
    </InputWrapper>
  );
};

const SelectInput = styled.select`

`;