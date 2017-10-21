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
          Already have an account? Sign in
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
            <AuthModalSolidBallPurpleLeft />
            <AuthModalSolidBallPurpleRight />
            <AuthModalHollowBallLeftTop />
            <AuthModalHollowBallLeftBottom />
            <AuthModalHollowBallRightTop />
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
  min-height: 170px;
  overflow: hidden;

  ${media.tablet`min-height: 150px;`};
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
  padding: 1rem 0 1.5rem;
`;

const AuthModalSolidBall = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
`;

const AuthModalSolidBallPurpleLeft = AuthModalSolidBall.extend`
  left: -144px;
  top: -201px;
  height: 340px;
  width: 340px;

  ${media.tablet`
    left: -44px;
    top: -80px;
    height: 200px;
    width: 200px;
  `};
`;

const AuthModalSolidBallPurpleRight = AuthModalSolidBall.extend`
  right: 20px;
  height: 220px;
  width: 220px;

  ${media.tablet`
    top: 21px;
    right: 8px;
    height: 160px;
    width: 160px;
  `};
`;

const AuthModalHollowBallLeftTop = styled.div`
  position: absolute;
  width: 170px;
  height: 170px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 79px;
  top: -126px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.3);

  ${media.tablet`display: none`};

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;
const AuthModalHollowBallRightTop = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  right: 20px;
  bottom: -72px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.3);

  ${media.tablet`display: none`};

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;

const AuthModalHollowBallLeftBottom = styled.div`
  position: absolute;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 110px;
  bottom: -57px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.3);

  ${media.tablet`display: none`};

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;
