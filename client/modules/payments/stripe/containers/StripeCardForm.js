// @flow
import React from 'react';
import styled from 'styled-components';
import { SubmitButton } from '../../../user-input/inputs/input/SubmitButton';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';

const createOptions = (fontSize: string) => ({
  style: {
    base: {
      fontSize,
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

const StripeCardForm = () => (
  <div>
    <LabelContainer>
      <Label>Card Number</Label>
      <CardNumberElement {...createOptions('16px')} />
    </LabelContainer>
    <LabelContainer>
      <Label>Expiry</Label>
      <CardExpiryElement {...createOptions('16px')} />
    </LabelContainer>
    <LabelContainer>
      <Label>CVC</Label>
      <CardCVCElement {...createOptions('16px')} />
    </LabelContainer>
    <ButtonContainer>
      <SubmitButton buttonText="Pay" />
    </ButtonContainer>
  </div>
);

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

const Label = styled.div`min-width: 100px;`;

const ButtonContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 15px;
`;
