import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import InputWrapper from '../components/InputWrapper';

const numberMask = createNumberMask({
  prefix: '$',
})

export const Currency = props => {
  return (
    <InputWrapper>
      <MaskedInput mask={numberMask} />
    </InputWrapper>
  );
};
