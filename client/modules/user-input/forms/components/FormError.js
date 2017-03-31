import React from 'react';
import styled from 'styled-components';

export const FormError = props => {
  return (
    <FormErrorContainer>
      {
        props.formErrors.map(error => {
          return (
            <div key={error.error}>{error.message}</div>
          );
        })
      }
    </FormErrorContainer>
  );
};

export default FormError;

const FormErrorContainer = styled.div`
  padding: 20px;
  background: #fee7e8;
  color: #cc0726;
  font-size: 16px;
  border: 1px solid #cc0726;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 1rem;
`;