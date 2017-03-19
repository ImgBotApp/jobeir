import React from 'react';
import MaskedInput from 'react-text-mask';

export const Phone = props => {
  return (
    <InputWrapper {...props}>
      <MaskedInput
        {...props.input}
        type="tel"
        id={props.input.name}
        name={props.input.name}
        guide={false}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    </InputWrapper>
  );
};
