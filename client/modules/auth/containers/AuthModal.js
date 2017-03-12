import React from 'react';
import ModalWrapper from '../../modal/components/ModalWrapper';

const AuthModal = () => {
  return (
    <ModalWrapper>
      <a href="/auth/google">Google</a>
      <a href="/auth/facebook">Facebook</a>
      <a href="/auth/github">Github</a>
    </ModalWrapper>
  );
};

export default AuthModal;
