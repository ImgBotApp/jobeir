import React from 'react';
import MaskedInput from 'react-text-mask';

export const Phone = props => {
  return (
    <InputWrapper>
      <MaskedInput
        guide={false}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        type="tel"
      />
    </InputWrapper>
  );
};
