import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';

export const Email = props => {
  console.log(props);
  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="email"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
      />
    </InputWrapper>
  );
};

const Input = styled.input`

`;