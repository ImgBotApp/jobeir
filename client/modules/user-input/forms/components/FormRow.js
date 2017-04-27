import React from 'react';
import styled from 'styled-components';

/**
 * FormRow
 * Will for the children to go on a single row
 * and apply a width of 48% to each child div
 */
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
