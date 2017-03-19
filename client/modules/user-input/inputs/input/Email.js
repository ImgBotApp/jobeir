import React from 'react';
import InputWrapper from '../components/InputWrapper';

export const Email = props => {
  return (
    <InputWrapper {...props}>
      <input
        {...props.input}
        type="email"
        id={props.input.name}
        name={props.input.name}
      />
    </InputWrapper>
  );
};
