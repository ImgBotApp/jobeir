// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import ModalWrapper from '../../modal/components/ModalWrapper';
import SignupForm from '../../user-input/forms/form/SignupForm';
import LoginForm from '../../user-input/forms/form/LoginForm';
import AuthOAuth from '../components/AuthOAuth';

class AuthModal extends Component {
  state: {
    showLoginForm: boolean,
    signupWithEmail: boolean
  };

  constructor(props) {
    super(props);

    this.state = {
      showLoginForm: false,
      signupWithEmail: false
    };
  }

  renderSignup() {
    const { signupWithEmail } = this.state;

    return (
      <div>
        {signupWithEmail ? <SignupForm /> : <AuthOAuth />}
        <AuthModalSignupEmail
          onClick={() => this.setState({ signupWithEmail: !signupWithEmail })}
        >
          {signupWithEmail
            ? 'Sign up with Google, Facebook, or Github'
            : 'Sign up with email'}
        </AuthModalSignupEmail>
        <AuthModalFooter onClick={() => this.setState({ showLoginForm: true })}>
          Already have an account? Log in
        </AuthModalFooter>
      </div>
    );
  }

  renderLogin() {
    return (
      <div>
        <AuthOAuth />
        <LoginForm />
        <AuthModalFooter
          onClick={() => this.setState({ showLoginForm: false })}
        >
          Don’t have an account? Sign up?
        </AuthModalFooter>
      </div>
    );
  }

  render() {
    return (
      <ModalWrapper bgColor="white">
        <AuthModalBody>
          <AuthModalHeader>
            <AuthModalHeaderText>Lorem Ipmsun</AuthModalHeaderText>
          </AuthModalHeader>
          <AuthModalContent>
            {this.state.showLoginForm
              ? this.renderLogin()
              : this.renderSignup()}
          </AuthModalContent>
        </AuthModalBody>
      </ModalWrapper>
    );
  }
}

export default AuthModal;

const AuthModalBody = styled.div`
  max-width: 500px;
  width: 100%;
`;

const AuthModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.blue};
  min-height: 130px;
  overflow: hidden;

  ${media.tablet`min-height: 120px;`};
  ${media.phonePlus`min-height: 100px;`};
  ${media.phone`min-height: 80px;`};
`;

const AuthModalHeaderText = styled.h2`
  font-size: 42px;
  color: #fff;
  font-weight: 900;

  ${media.tablet`font-size: 34px;`};
  ${media.phonePlus`font-size: 30px;`};
  ${media.phone`font-size: 28px;`};
`;

const AuthModalContent = styled.div`
  padding: 36px;

  ${media.tablet`padding: 24px`};
`;

const AuthModalFooter = styled.div`
  text-align: center;
  cursor: pointer;
  padding-top: 2rem;
  border-top: 1px solid #dce0e0;
`;

const AuthModalSignupEmail = styled.div`
  text-align: center;
  cursor: pointer;
  padding-bottom: 1.5rem;
`;
