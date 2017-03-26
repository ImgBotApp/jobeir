import React from 'react';
import InputWrapper from '../components/InputWrapper';

export const Select = props => {
  return (
    <InputWrapper {...props}>
      <select
        {...props.input}
        id={props.input.name}
        name={props.input.name}
      >
        <option />
      </select>
    </InputWrapper>
  );
};
