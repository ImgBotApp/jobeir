// CheckoutForm.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Elements } from 'react-stripe-elements';
import StripeCheckoutForm from '../components/StripeCheckoutForm';

const SripeTheme = {
  input: {
    borderRadius: '0px',
    border: 'none',
    padding: '9px 12px 12px 18px',
    fontSize: '16px',
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
    marginBottom: '3px',
    fontSize: '16px',
    width: '120px'
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
      fontSize: '16px',
      maxWidth: '500px'
    }
  },
  select: {
    background: '#fff',
    borderRadius: '0px',
    border: 'none',
    padding: '9px 12px 12px 18px',
    fontSize: '18px',
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    activeBorderColor: '#5C6AC4',
    ph: {
      color: '#afafaf'
    },
    svg: {
      top: '2px'
    }
  }
};

const StripeCheckout = () => (
  <ThemeProvider theme={SripeTheme}>
    <Elements>
      <StripeCheckoutForm />
    </Elements>
  </ThemeProvider>
);

export default StripeCheckout;
