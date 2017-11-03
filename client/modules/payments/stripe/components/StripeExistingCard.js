// CheckoutForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import StripeErrorHandler from './StripeErrorHandler';
import { SubmitButton } from '../../../user-input/inputs/input/SubmitButton';
import { stripeExistingPaymentRequest, JOB_PAYMENT_MODAL } from '../ducks';
import { hideModal } from '../../../modal/ducks';

class StripeExistingCard extends Component {
  state = {
    error: undefined,
    isPaying: false,
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
    const { activeCompany, customer, dispatch, job, user } = this.props;

    this.setState({ error: undefined });
    dispatch(
      stripeExistingPaymentRequest({
        activeCompany,
        job,
        customer,
        user,
      }),
    );
  };

  render() {
    const { error, creatingToken } = this.state;
    const { customer, payments } = this.props;

    const card = customer.sources.data.find(
      source => source.id === customer.default_source,
    );

    return (
      <CheckoutContainer onSubmit={this.handleSubmit}>
        <CardContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '25px',
            }}
          >
            <div>{card.country}</div>

            <div>
              {card.brand} {card.object}
            </div>
          </div>
          <div style={{ textAlign: 'right', marginBottom: '25px' }}>
            **** **** **** {card.last4}
          </div>
          <div style={{ textAlign: 'right' }}>
            {card.exp_month} / {card.exp_year}
          </div>
        </CardContainer>
        <ButtonContainer key="Button">
          <SubmitButton
            isSubmitting={payments.isPaying}
            buttonText={
              <span>
                <ButtonLock /> Pay $49
              </span>
            }
          />
          <CheckoutFooter>
            Powered by <StripeLogo width="60" />
          </CheckoutFooter>
        </ButtonContainer>
      </CheckoutContainer>
    );
  }
}

export default connect(state => ({
  activeCompany: state.account.companies.activeCompany,
  payments: state.payments,
  user: {
    email: state.session.user.email,
    _id: state.session.user._id,
    firstName: state.session.user.firstName,
    lastName: state.session.user.lastName,
  },
}))(StripeExistingCard);

const CheckoutContainer = styled.form`
  margin: 0 auto;
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

const CardContainer = styled.div`
  border-radius: 10px;
  padding: 40px;
  margin: 0 auto 30px;
  color: ${props => props.theme.colors.black};
  font-family: Source Code Pro, monospace;
  background: ${props => props.theme.colors.grey.bg};
  box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 25px;
`;

const CheckoutFooter = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fontFamily.avenir};
  font-size: 16px;
  font-weight: 400;
`;

const ButtonLock = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    enableBackground="new 0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M13.5,15.5h-11 c-0.552,0-1-0.448-1-1v-7c0-0.552,0.448-1,1-1h11c0.552,0,1,0.448,1,1v7C14.5,15.052,14.052,15.5,13.5,15.5z"
      />
      <path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M4.5,6.5V4 c0-1.933,1.567-3.5,3.5-3.5h0c1.933,0,3.5,1.567,3.5,3.5v2.5"
      />
    </g>
  </svg>
);

const StripeLogo = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 468 222.5"
  >
    <style type="text/css">
      {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#6772E5;}`}
    </style>
    <g id="Stripe">
      <path
        className="st0"
        d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3
		c11.9,0,20.9-2.7,27.7-6.5V132c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z
		 M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z"
      />
      <path
        className="st0"
        d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22l0,116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3
		c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1
		c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z"
      />
      <polygon
        className="st0"
        points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3 	"
      />
      <rect x="223.8" y="69.3" className="st0" width="25.1" height="87.5" />
      <path
        className="st0"
        d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z"
      />
      <path
        className="st0"
        d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135
		c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z"
      />
      <path
        className="st0"
        d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6
		C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7
		c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z"
      />
    </g>
  </svg>
);
