// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import ModalWrapper from '../../../modal/components/ModalWrapper';
import StripeCheckout from '../../../payments/stripe/containers/StripeCheckout';

const JobsPaymentModal = () => (
  <ModalWrapper>
    <StripeCheckout />
  </ModalWrapper>
);

export default JobsPaymentModal;
