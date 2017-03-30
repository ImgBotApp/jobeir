import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

export const Textarea = props => {
  return (
    <InputWrapper {...props}>
      <TextareaInput
        {...props.input}
        id={props.input.name}
        name={props.input.name}
      />
    </InputWrapper>
  );
};

const TextareaInput = styled.textarea`

`;