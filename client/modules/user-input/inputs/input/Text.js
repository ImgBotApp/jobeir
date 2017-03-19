import React from 'react';
import InputWrapper from '../components/InputWrapper';

export const Text = props => {
  return (
    <InputWrapper {...props}>
      <input
        {...props.input}
        type="text"
        id={props.input.name}
        name={props.input.name}
      />
    </InputWrapper>
  );
};
