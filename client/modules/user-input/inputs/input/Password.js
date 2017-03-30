import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import { Input } from './Input';

export const Password = props => {
  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="password"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
      />
    </InputWrapper>
  );
};
