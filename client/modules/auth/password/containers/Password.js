import React from 'react';
import Helmet from 'react-helmet';
import AppHead from '../../../app/components/AppHead';
import PasswordForm from '../../../user-input/forms/form/PasswordForm';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';

const Reset = props => (
  <AuthPage>
    <AppHead title="Reset your password" />
    <AuthHeader text="Reset your password" />
    <PasswordForm resetPasswordToken={props.params.resetPasswordToken} />
  </AuthPage>
);

export default Reset;
