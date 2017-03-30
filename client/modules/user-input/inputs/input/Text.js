import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import { Input } from './Input';

export const Text = props => {
  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="text"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
      />
    </InputWrapper>
  );
};
