import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import { Input } from './Input';

export const Password = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="password"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        style={{ borderColor: showError ? '#cc0726' : '' }}
      />
    </InputWrapper>
  );
};
