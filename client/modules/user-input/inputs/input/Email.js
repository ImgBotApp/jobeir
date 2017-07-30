// @flow
import React from 'react';
import InputWrapper from '../components/InputWrapper';
import { Input } from './Input';

export const Email = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="email"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
      />
    </InputWrapper>
  );
};
