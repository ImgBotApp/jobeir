// CheckoutForm.js
import React from 'react';
import { Elements } from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import StripeCardSection from '../components/StripeCardSection';

class StripeCheckout extends React.Component<{}, { elementFontSize: string }> {
  render() {
    return (
      <div className="Checkout">
        <Elements>
          <StripeCardSection fontSize="18px" />
        </Elements>
      </div>
    );
  }
}

export default StripeCheckout;
