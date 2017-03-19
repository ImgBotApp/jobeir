import React from 'react';
import InputWrapper from '../components/InputWrapper';

export const Password = props => {
  return (
    <InputWrapper {...props}>
      <input
        {...props.input}
        type="password"
        id={props.input.name}
        name={props.input.name}
      />
    </InputWrapper>
  );
};
