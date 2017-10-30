// CheckoutForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import StripeCardForm from './StripeCardForm';
import StripeAboutForm from './StripeAboutForm';
import StripeErrorHandler from './StripeErrorHandler';
import { injectStripe } from 'react-stripe-elements';
import { stripePaymentRequest } from '../ducks';

class StripeCheckoutForm extends Component {
  state = {
    error: undefined
  };

  handleSubmit = event => {
    event.preventDefault();
    const { activeCompany, dispatch, job, stripe, stripeForm } = this.props;

    if (!stripeForm) {
      return this.setState({
        error: {
          type: 'stripeForm',
          message: 'Please complete all missing fields'
        }
      });
    }
    // Gather additional customer data we may have collected in our form.

    const additionalData = {
      name: stripeForm.name ? stripeForm.value : undefined,
      address_line1: stripeForm.address ? stripeForm.address : undefined,
      address_city: stripeForm.city ? stripeForm.city : undefined,
      address_state: stripeForm.state ? stripeForm.state : undefined,
      address_zip: stripeForm.zip ? stripeForm.zip : undefined
    };

    return stripe
      .createToken(stripe.elements[0], additionalData)
      .then(payload => {
        console.log({ payload, additionalData });

        if (payload.error) {
          return this.setState({ error: payload.error });
        }

        this.setState({ error: undefined });
        dispatch(
          stripePaymentRequest({
            activeCompany,
            job,
            token: payload.token
          })
        );
      });
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.handleSubmit} id="StripeCheckoutForm">
        <CheckoutContainer>
          <StripeErrorHandler error={error} />
          <StripeAboutForm />
          <StripeCardForm error={error} />
        </CheckoutContainer>
      </form>
    );
  }
}

export default injectStripe(
  connect(state => ({
    stripeForm: state.form.stripe && state.form.stripe.values,
    activeCompany: state.account.companies.activeCompany
  }))(StripeCheckoutForm)
);

const CheckoutContainer = styled.div`
  margin: 0 auto;
  font-family: 'Avenir STD', Source Code Pro, monospace;
  padding: 24px;
  width: 100%;
  padding: 50px;
  flex-basis: 50%;
  width: 440px;

  ${media.phonePlus`
    width: 100%;
    padding: 32px;
  `};
`;
