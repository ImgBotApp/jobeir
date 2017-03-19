import React, { Component } from 'react';
import ModalWrapper from '../../modal/components/ModalWrapper';
import SignupForm from '../../user-input/forms/form/SignupForm';
import LoginForm from '../../user-input/forms/form/LoginForm';
import AuthOAuth from '../components/AuthOAuth';

class AuthModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showLoginForm: false,
    };
  }

  renderSignup() {
    return (
      <div>
        <AuthOAuth />
        <SignupForm />
        <div onClick={() => this.setState({ showLoginForm: true })}>Already have an account? Log in</div>
      </div>
    );
  }

  renderLogin() {
    return (
      <div>
        <AuthOAuth />
        <LoginForm />
        <div onClick={() => this.setState({ showLoginForm: false })}>Don’t have an account? Sign up?</div>
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
