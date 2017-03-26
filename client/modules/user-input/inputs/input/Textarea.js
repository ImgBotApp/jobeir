import React from 'react';
import InputWrapper from '../components/InputWrapper';

export const Textarea = props => {
  return (
    <InputWrapper {...props}>
      <textarea
        {...props.input}
        id={props.input.name}
        name={props.input.name}
      />
    </InputWrapper>
  );
};
