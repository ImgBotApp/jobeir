// CheckoutForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Elements } from 'react-stripe-elements';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import StripeExistingCard from '../components/StripeExistingCard';
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
      color: '#afafaf',
    },
  },
  inputWrapper: {
    marginBottom: '0.5rem',
    borderBottom: '1px solid #d8d8d8',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '0px',
    fontSize: '14px',
    width: '100px',
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
      maxWidth: '500px',
    },
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
      fontSize: '14px',
    },
    svg: {
      top: '2px',
    },
  },
};

class StripeCheckout extends Component {
  state = {
    showExistingCard: true,
  };

  handlePaymentOptionClick = () => {
    this.setState({ showExistingCard: !this.state.showExistingCard });
  };

  render() {
    const { showExistingCard } = this.state;
    const { company, job } = this.props;
    const hasExistingCard = company.billing.stripe;

    return (
      <ThemeProvider theme={SripeTheme}>
        <StripeCheckoutContainer>
          <StripeCheckoutReasons />
          <div>
            {hasExistingCard && this.state.showExistingCard ? (
              <StripeExistingCard
                customer={company.billing.stripe.customer}
                job={job}
              />
            ) : (
              <Elements>
                <StripeCheckoutForm job={job} />
              </Elements>
            )}
            {hasExistingCard && (
              <StripeCheckoutSwitchPayments
                onClick={this.handlePaymentOptionClick}
              >
                {showExistingCard ? 'Use a new card' : 'Use an existing card'}
              </StripeCheckoutSwitchPayments>
            )}
          </div>
        </StripeCheckoutContainer>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  company: state.account.companies.created.find(
    company => company._id === state.account.companies.activeCompany._id,
  ),
});

export default connect(mapStateToProps)(StripeCheckout);

const StripeCheckoutContainer = styled.div`
  display: flex;
  align-items: stretch;

  ${media.tablet`
    flex-direction: column-reverse;
  `};
`;

const StripeCheckoutSwitchPayments = styled.button`
  display: block;
  margin: 0 auto 30px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-family: ${props => props.theme.fontFamily.avenir};
  cursor: pointer;
`;
