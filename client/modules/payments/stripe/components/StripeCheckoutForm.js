// CheckoutForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import StripeCardForm from './StripeCardForm';
import StripeAboutForm from './StripeAboutForm';
import StripeErrorHandler from './StripeErrorHandler';
import { injectStripe } from 'react-stripe-elements';
import { stripePaymentRequest, JOB_PAYMENT_MODAL } from '../ducks';
import { hideModal } from '../../../modal/ducks';

class StripeCheckoutForm extends Component {
  state = {
    error: undefined,
    isPaying: false
  };

  componentWillReceiveProps(nextProps) {
    const { payments, dispatch } = this.props;
    if (
      payments.hasPaid !== nextProps.payments.hasPaid &&
      nextProps.payments.hasPaid
    ) {
      dispatch(hideModal(JOB_PAYMENT_MODAL));
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ creatingToken: true });
    const {
      activeCompany,
      dispatch,
      job,
      stripe,
      stripeForm,
      user
    } = this.props;

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
        if (payload.error) {
          return this.setState({ error: payload.error });
        }

        this.setState({ creatingToken: false, error: undefined });
        dispatch(
          stripePaymentRequest({
            activeCompany,
            job,
            token: payload.token,
            user
          })
        );
      });
  };

  render() {
    const { error, creatingToken } = this.state;

    return (
      <form onSubmit={this.handleSubmit} id="StripeCheckoutForm">
        <CheckoutContainer>
          <StripeErrorHandler error={error} />
          <StripeAboutForm />
          <StripeCardForm
            error={error}
            isPaying={creatingToken || this.props.payments.isPaying}
          />
        </CheckoutContainer>
      </form>
    );
  }
}

export default injectStripe(
  connect(state => ({
    stripeForm: state.form.stripe && state.form.stripe.values,
    activeCompany: state.account.companies.activeCompany,
    payments: state.payments,
    user: {
      email: state.session.user.email,
      _id: state.session.user._id,
      firstName: state.session.user.firstName,
      lastName: state.session.user.lastName
    }
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
