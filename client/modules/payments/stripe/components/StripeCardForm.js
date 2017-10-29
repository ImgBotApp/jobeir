// @flow
import React from 'react';
import styled from 'styled-components';
import { SubmitButton } from '../../../user-input/inputs/input/SubmitButton';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '14px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#afafaf'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

const StripeCardForm = ({ error = {} }) => [
  <LabelContainer key="CardNumber">
    <Label error={error.code === 'incomplete_number'}>Card Number</Label>
    <CardNumberElement {...createOptions()} />
  </LabelContainer>,
  <LabelContainer key="Expiry">
    <Label error={error.code === 'incomplete_expiry'}>Expiry</Label>
    <CardExpiryElement {...createOptions()} />
  </LabelContainer>,
  <LabelContainer key="CVC">
    <Label error={error.code === 'incomplete_cvc'}>CVC</Label>
    <CardCVCElement {...createOptions()} />
  </LabelContainer>,
  <ButtonContainer key="Button">
    <SubmitButton buttonText="Pay $49" />
  </ButtonContainer>
];

export default StripeCardForm;

const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  margin: 0 auto 0.5rem;

  .StripeElement {
    width: 100%;
    padding: 9px 12px 12px 18px;
  }
`;

const Label = styled.div`
  min-width: 120px;
  color: ${props => (props.error ? '#f73c3c' : 'inherit')};
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 25px;
`;
