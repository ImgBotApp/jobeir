// @flow
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
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
        <Helmet title="Signup" />
        <AuthHeader text="Sign up for jobeir" />
        {signupWithEmail ? <SignupForm /> : <AuthOAuth />}
        <AuthSignupEmail
          onClick={() => this.setState({ signupWithEmail: !signupWithEmail })}
        >
          {signupWithEmail
            ? 'Sign up with Google, Facebook, or Github'
            : 'Sign up with email'}
        </AuthSignupEmail>
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
