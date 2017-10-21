import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
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
    <LoginContainer>
      <AuthOAuth padded={true} />
      <LoginForm />
    </LoginContainer>
    <AuthFooter link="/reset" text="Forgot Password?" />
  </AuthPage>
);

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.phablet`
    flex-direction: column;
  `};
`;
