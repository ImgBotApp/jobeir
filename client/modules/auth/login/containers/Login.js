import React from 'react';
import AppHead from '../../../app/components/AppHead';
import LoginForm from '../../../user-input/forms/form/LoginForm';
import AuthOAuth from '../../components/AuthOAuth';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';
import AuthFooter from '../../components/AuthFooter';

const Login = () => (
  <AuthPage>
    <AppHead title="Sign in" />
    <AuthHeader text="Sign into Jobeir" />
    <div>
      <AuthOAuth />
      <LoginForm />
    </div>
    <AuthFooter link="/reset" text="Forgot Password?" />
  </AuthPage>
);

export default Login;
