import React from 'react';
import Helmet from 'react-helmet';
import LoginForm from '../../../user-input/forms/form/LoginForm';
import AuthOAuth from '../../components/AuthOAuth';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';
import AuthFooter from '../../components/AuthFooter';

const Login = () => (
  <AuthPage>
    <Helmet title="Login" />
    <AuthHeader text="Jobeir Log in" />
    <AuthOAuth />
    <LoginForm />
    <AuthFooter link="/reset" text="Forgot Password?" />
  </AuthPage>
);

export default Login;
