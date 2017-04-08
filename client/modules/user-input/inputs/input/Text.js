import React from 'react';
import InputWrapper from '../components/InputWrapper';
import { Input } from './Input';

export const Text = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="text"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
      />
    </InputWrapper>
  );
};
