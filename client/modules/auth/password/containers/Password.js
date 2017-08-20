import React from 'react';
import Helmet from 'react-helmet';
import PasswordForm from '../../../user-input/forms/form/PasswordForm';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';

const Reset = props =>
  <AuthPage>
    <Helmet title="Reset Password" />
    <AuthHeader text="Reset Password" />
    <PasswordForm resetPasswordToken={props.params.resetPasswordToken} />
  </AuthPage>;

export default Reset;
