import React from 'react';
import styled from 'styled-components';

export const FormHeader = props => {
  return (
    <FormHeaderContainer>
      <Header>
        {props.text}
      </Header>
    </FormHeaderContainer>
  );
};

export default FormHeader;

const FormHeaderContainer = styled.div`
`;

const Header = styled.h2`
  font-size: 2rem;
`;