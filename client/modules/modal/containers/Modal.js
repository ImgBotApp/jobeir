// @flow
import React from 'react';
import { connect } from 'react-redux';
import AuthModal from '../../auth/containers/AuthModal';
import JobPaymentModal from '../../account/jobs/containers/JobsPaymentModal';

const MODAL_COMPONENTS = {
  AUTH_MODAL: AuthModal,
  JOB_PAYMENT_MODAL: JobPaymentModal
};

const Modal = ({ modalType, modalProps }) => {
  const SpecificModal = MODAL_COMPONENTS[modalType];

  /**
   * If there is modalType, we want to remove scroll on the body
   * and render the modal. Otherwise, remove all styles from body.
   */
  if (modalType) {
    document.body.style.overflow = 'hidden';
    return <SpecificModal {...modalProps} />;
  }

  document.body.removeAttribute('style');
  // expects something to be returned, null or a component
  return null;
};

export default connect(state => state.modal)(Modal);
