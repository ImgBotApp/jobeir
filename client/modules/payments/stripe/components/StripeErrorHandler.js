// @flow
import React from 'react';
import styled from 'styled-components';

const StripeErrorHandler = ({ error }) => {
  if (!error) return null;

  return <FormErrorContainer>{error.message}</FormErrorContainer>;
};

export default StripeErrorHandler;

const FormErrorContainer = styled.div`
  position: relative;
  padding: 18px;
  margin-bottom: 1.5rem;
  background: #fee7e8;
  color: #f73c3c;
  font-size: 16px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid #f5c2c2;
  width: 100%;
  line-height: 1.6;
`;
