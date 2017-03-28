import React, { Component } from 'react';
import styled from 'styled-components';
import ModalWrapper from '../../modal/components/ModalWrapper';
import SignupForm from '../../user-input/forms/form/SignupForm';
import LoginForm from '../../user-input/forms/form/LoginForm';
import AuthOAuth from '../components/AuthOAuth';

class AuthModal extends Component {
  state = { showLoginForm: false };

  renderSignup() {
    return (
      <div>
        <AuthOAuth />
        <SignupForm />
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
        <AuthModalFooter onClick={() => this.setState({ showLoginForm: false })}>
          Don’t have an account? Sign up?
        </AuthModalFooter>
      </div>
    );
  }

  render() {
    return (
      <ModalWrapper>
        <AuthModalBody>
          <AuthModalHeader>
            <AuthModalHeaderBlue />
            <AuthModalHeaderRed />
            <AuthModalHeaderBeige />
            Logo
          </AuthModalHeader>
          <AuthModalContent>
            {
              this.state.showLoginForm
                ? this.renderLogin()
                : this.renderSignup()
            }
          </AuthModalContent>
        </AuthModalBody>
      </ModalWrapper>
    );
  }
};

export default AuthModal;

const AuthModalBody = styled.div`
  min-width: 500px;
`;

const AuthModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.pink};
  min-height: 175px;
  overflow: hidden;
`;

const AuthModalContent = styled.div`
  padding: 2rem;
`;

const AuthModalHeaderBall = styled.div`
  border-radius: 50%;
  position: absolute;
`;

const AuthModalHeaderBlack = styled(AuthModalHeaderBall)`
  right: 325px;
  top: -500px;
  height: 800px;
  width: 800px;
  background: ${props => props.theme.black};
`;

const AuthModalHeaderBlue = styled(AuthModalHeaderBall)`
  right: 125px;
  top: -500px;
  height: 800px;
  width: 800px;
  background: ${props => props.theme.blue};
`;

const AuthModalHeaderRed = styled(AuthModalHeaderBall)`
  right: 120px;
  bottom: 25px;
  height: 115px;
  width: 115px;
  background: ${props => props.theme.red};
`;

const AuthModalHeaderBeige = styled(AuthModalHeaderBall)`
  top: 107px;
  left: -487px;
  height: 1000px;
  width: 1000px;
  background: ${props => props.theme.beige};
`;

const AuthModalFooter = styled.div`
  text-align: center;
  cursor: pointer;
  padding-top: 2rem;
`;