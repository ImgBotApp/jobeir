import React from 'react';
import styled from 'styled-components';

export const FormRow = props => {
  return (
    <FormRowContainer>
      {props.children}
    </FormRowContainer>
  );
};

export default FormRow;

const FormRowContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: 48%;
  }
`;
