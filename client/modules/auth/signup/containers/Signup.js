// @flow
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import AppHead from '../../../app/components/AppHead';
import SignupForm from '../../../user-input/forms/form/SignupForm';
import AuthOAuth from '../../components/AuthOAuth';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';

class Signup extends Component {
  state: {
    signupWithEmail: boolean
  };

  state = { signupWithEmail: false };

  render() {
    const { signupWithEmail } = this.state;

    return (
      <AuthPage>
        <AppHead title="Signup" />
        <AuthHeader text="Sign up for Jobeir" />
        <AuthSignupContainer>
          {signupWithEmail ? <SignupForm /> : <AuthOAuth />}
          <AuthSignupEmail
            onClick={() => this.setState({ signupWithEmail: !signupWithEmail })}
          >
            {signupWithEmail
              ? 'Sign up with Google, Facebook, or Github'
              : 'Sign up with email'}
          </AuthSignupEmail>
        </AuthSignupContainer>
      </AuthPage>
    );
  }
}

export default Signup;

const AuthSignupEmail = styled.div`
  text-align: center;
  cursor: pointer;
  padding-top: 1rem;
`;

const AuthSignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;
