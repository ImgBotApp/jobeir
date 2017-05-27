import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import LoginForm from '../../../user-input/forms/form/LoginForm';
import AuthOAuth from '../../components/AuthOAuth';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';
import AuthFooter from '../../components/AuthFooter';

class Login extends Component {
  render() {
    return (
      <AuthPage>
        <Helmet title="Login" />
        <AuthHeader text="Log into This Application" />
        <AuthOAuth />
        <LoginForm />
        <AuthFooter link="/reset" text="Forgot Password?" />
      </AuthPage>
    );
  }
}

export default Login;
