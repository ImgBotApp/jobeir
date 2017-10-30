// CheckoutForm.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Elements } from 'react-stripe-elements';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import StripeCheckoutReasons from '../components/StripeCheckoutReasons';

const SripeTheme = {
  input: {
    borderRadius: '0px',
    border: 'none',
    padding: '9px 12px 12px 18px',
    height: '40px',
    fontSize: '14px',
    width: '100%',
    margin: '0 auto',
    activeBorderColor: '#5C6AC4',
    ph: {
      color: '#afafaf'
    }
  },
  inputWrapper: {
    marginBottom: '0.5rem',
    borderBottom: '1px solid #d8d8d8',
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    display: 'block',
    marginBottom: '0px',
    fontSize: '14px',
    width: '100px'
  },
  button: {
    height: '50px',
    borderRadius: '3px',
    outline: 'none',
    border: 'none',
    background: '#5C6AC4',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '2rem',
    fontSize: '18px',
    color: '#fff',
    tablet: {
      fontSize: '14px',
      maxWidth: '500px'
    }
  },
  select: {
    background: '#fff',
    borderRadius: '0px',
    border: 'none',
    padding: '9px 12px 12px 18px',
    fontSize: '14px',
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    activeBorderColor: '#5C6AC4',
    ph: {
      color: '#afafaf',
      fontSize: '14px'
    },
    svg: {
      top: '2px'
    }
  }
};

const StripeCheckout = ({ job }) => (
  <ThemeProvider theme={SripeTheme}>
    <StripeCheckoutContainer>
      <StripeCheckoutReasons />
      <Elements>
        <StripeCheckoutForm job={job} />
      </Elements>
    </StripeCheckoutContainer>
  </ThemeProvider>
);

export default StripeCheckout;

const StripeCheckoutContainer = styled.div`
  display: flex;
  align-items: stretch;

  ${media.tablet`
    flex-direction: column-reverse;
  `};
`;
