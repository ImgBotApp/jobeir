// @flow
import React from 'react';
import { CardElement } from 'react-stripe-elements';

const createOptions = (fontSize: string) => ({
  style: {
    base: {
      fontSize,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

class StripeCardSection extends React.Component {
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => console.log(payload));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement {...createOptions(this.props.fontSize)} />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}

export default StripeCardSection;
