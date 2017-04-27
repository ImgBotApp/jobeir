import React from 'react';
import styled from 'styled-components';

export const AuthOAuth = () => (
  <OAuthButtonContainer>
    <GoogleButton href="/auth/google">
      <GoogleIcon />
      <OAuthButtonText>Continue with Google</OAuthButtonText>
    </GoogleButton>
    <FacebookButton href="/auth/facebook">
      <FacebookIcon />
      <OAuthButtonText>Continue with Facebook</OAuthButtonText>
    </FacebookButton>
    <GithubButton href="/auth/github">
      <GithubIcon />
      <OAuthButtonText>Continue with Github</OAuthButtonText>
    </GithubButton>
  </OAuthButtonContainer>
);

export default AuthOAuth;

const OAuthButtonContainer = styled.div`
  padding-bottom: 1rem;
`;

const OAuthButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 60px;
  border-radius: 2px;
  max-width: 456px;
  text-decoration: none;
  color: white;
  padding: 0 1rem;
  transition: background-color, border-color, 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);  
`;

const OAuthButtonText = styled.p`
  position: relative;
  top: 2px;
  padding-left: 1rem;
`;

const GoogleButton = styled(OAuthButton)`
  background-color: white;
  color: #6c6c6c;
  border: 1px solid #c5c4c4;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const FacebookButton = styled(OAuthButton)`
  background-color: #3b5997;

  &:hover {
    background-color: #344e84;
  }
`;

const GithubButton = styled(OAuthButton)`
  background-color: #24292e;

  &:hover {
    background-color: #1b2025;
  }
`;

const FacebookIcon = () => (
  <svg width="25" viewBox="0 0 25 25">
    <path
      d="M23.62,0H1.38A1.38,1.38,0,0,0,0,1.38V23.62A1.38,1.38,0,0,0,1.38,25h12V15.32H10.1V11.55h3.26V8.76c0-3.23,2-5,4.85-5a26.73,26.73,0,0,1,2.91.15V7.3h-2c-1.57,0-1.87.74-1.87,1.84v2.41H21l-.49,3.77H17.25V25h6.37A1.38,1.38,0,0,0,25,23.62V1.38A1.38,1.38,0,0,0,23.62,0Z"
      fill="#fff"
    />
  </svg>
);
const GoogleIcon = () => (
  <svg width="25" viewBox="0 0 25 25">
    <path
      d="M24.5,12.78a14.36,14.36,0,0,0-.23-2.56H12.5v4.84h6.73a5.75,5.75,0,0,1-2.49,3.77V22h4a12.19,12.19,0,0,0,3.73-9.19Z"
      fill="#4285f4"
    />
    <path
      d="M12.5,25a11.93,11.93,0,0,0,8.27-3l-4-3.14a7.54,7.54,0,0,1-11.23-4H1.33v3.24A12.5,12.5,0,0,0,12.5,25Z"
      fill="#34a853"
    />
    <path
      d="M5.51,14.88a7.39,7.39,0,0,1,0-4.75V6.89H1.33a12.52,12.52,0,0,0,0,11.23l4.18-3.24Z"
      fill="#fbbc05"
    />
    <path
      d="M12.5,5a6.75,6.75,0,0,1,4.78,1.87l3.59-3.59A12,12,0,0,0,12.5,0,12.5,12.5,0,0,0,1.33,6.89l4.18,3.24A7.45,7.45,0,0,1,12.5,5Z"
      fill="#ea4335"
    />
    <path d="M0,0H25V25H0Z" fill="none" />
  </svg>
);
const GithubIcon = () => (
  <svg width="25" viewBox="0 0 25 24.47">
    <path
      d="M12.56,0a12.55,12.55,0,0,0-4,24.45c.62.12.85-.27.85-.61V21.71C5.94,22.47,5.2,20,5.2,20a3.32,3.32,0,0,0-1.39-1.83c-1.14-.77.08-.77.08-.77a2.63,2.63,0,0,1,1.93,1.29,2.67,2.67,0,0,0,3.63,1.05h0a2.68,2.68,0,0,1,.77-1.68c-2.76-.3-5.68-1.38-5.68-6.18A4.85,4.85,0,0,1,5.85,8.53,4.51,4.51,0,0,1,6,5.21S7,4.87,9.42,6.49a11.89,11.89,0,0,1,6.28,0c2.4-1.62,3.45-1.29,3.45-1.29a4.51,4.51,0,0,1,.11,3.32,4.84,4.84,0,0,1,1.29,3.37c0,4.82-2.93,5.88-5.73,6.16a3,3,0,0,1,.85,2.31V23.8c0,.42.22.72.86.6A12.55,12.55,0,0,0,12.56,0Z"
      fill="#fff"
    />
  </svg>
);
