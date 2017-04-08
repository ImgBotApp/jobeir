import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import { Input } from './Input';

export const Email = props => {
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
