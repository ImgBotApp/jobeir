// @flow
import React from 'react';
import ModalWrapper from '../../../modal/components/ModalWrapper';
import StripeCheckout from '../../../payments/stripe/containers/StripeCheckout';

const JobsPaymentModal = job => (
  <ModalWrapper modalFull modalSize="880px" bgColor="white">
    <StripeCheckout job={job} />
  </ModalWrapper>
);

export default JobsPaymentModal;
