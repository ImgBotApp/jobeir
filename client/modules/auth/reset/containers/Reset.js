import React from 'react';
import AppHead from '../../../app/components/AppHead';
import ResetForm from '../../../user-input/forms/form/ResetForm';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';
import AuthFooter from '../../components/AuthFooter';

const Reset = () => (
  <AuthPage>
    <AppHead title="Rest your password" />
    <AuthHeader text="Reset your password" />
    <ResetForm />
    <AuthFooter link="/signin" text="Sign in" />
  </AuthPage>
);

export default Reset;
