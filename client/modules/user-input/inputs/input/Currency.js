import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import InputWrapper from '../components/InputWrapper';

const numberMask = createNumberMask({
  prefix: '$',
})

export const Currency = props => {
  return (
    <InputWrapper {...props}>
      <MaskedInput
        {...props.input}
        id={props.input.name}
        name={props.input.name}
        mask={numberMask}
      />
    </InputWrapper>
  );
};
