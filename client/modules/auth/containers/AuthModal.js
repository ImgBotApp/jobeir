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
        <AuthModalFooter onClick={this.setState({ showLoginForm: true })}>
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
        <AuthModalFooter onClick={this.setState({ showLoginForm: false })}>
          Don’t have an account? Sign up?
        </AuthModalFooter>
      </div>
    );
  }

  render() {
    return (
      <ModalWrapper>
        {
          this.state.showLoginForm
            ? this.renderLogin()
            : this.renderSignup()
        }
      </ModalWrapper>
    );
  }
};

export default AuthModal;

const AuthModalFooter = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 2rem 0;
`;