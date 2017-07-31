// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
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
            <AuthModalHeaderBlue />
            <AuthModalHeaderRed />
            <AuthModalHeaderBeige />
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

const AuthModalBody = styled.div`min-width: 500px;`;

const AuthModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.pink};
  min-height: 175px;
  overflow: hidden;
`;

const AuthModalContent = styled.div`padding: 2rem;`;

const AuthModalHeaderBall = styled.div`
  border-radius: 50%;
  position: absolute;
`;

const AuthModalHeaderBlack = styled(AuthModalHeaderBall)`
  right: 325px;
  top: -500px;
  height: 800px;
  width: 800px;
  background: ${props => props.theme.colors.black};
`;

const AuthModalHeaderBlue = styled(AuthModalHeaderBall)`
  right: 125px;
  top: -500px;
  height: 800px;
  width: 800px;
  background: ${props => props.theme.colors.blue};
`;

const AuthModalHeaderRed = styled(AuthModalHeaderBall)`
  right: 120px;
  bottom: 25px;
  height: 115px;
  width: 115px;
  background: ${props => props.theme.colors.red};
`;

const AuthModalHeaderBeige = styled(AuthModalHeaderBall)`
  top: 107px;
  left: -487px;
  height: 1000px;
  width: 1000px;
  background: ${props => props.theme.colors.beige};
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
