// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { FadeIn } from '../../../../styles/animate';

export const FormError = (props: {
  formErrors: Array<{ error: string, message: string }>
}) => (
  <FormErrorContainer>
    <FadeIn>
      {props.formErrors.map(error => (
        <div key={error.error}>{error.message}</div>
      ))}
    </FadeIn>
  </FormErrorContainer>
);

export default FormError;

const FormErrorContainer = styled.div`
  padding: 18px;
  background: #fee7e8;
  color: #f73c3c;
  font-size: 16px;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative
  border: 1px solid #f5c2c2;
  width: ${props => props.theme.error.width};

  ${media.phablet`
    width: 100%
  `};
`;
