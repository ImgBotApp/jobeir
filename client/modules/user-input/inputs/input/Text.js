// @flow
import React from 'react';
import InputWrapper from '../components/InputWrapper';
import { Input } from './Input';

export const Text = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string,
  autoFocus?: boolean
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type={props.input.type || 'text'}
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
        autoFocus={props.autoFocus}
      />
    </InputWrapper>
  );
};

Text.defaultProps = {
  autoFocus: false
};
