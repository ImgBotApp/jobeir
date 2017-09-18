// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import docCookies from '../../../utils/cookies';
import { FacebookIcon, GoogleIcon, GithubIcon } from '../../../icons/';

const buildRedirectPath = (routing: { search: 'string' }) => {
  if (routing.search) {
    return routing.search.split('=')[1];
  }

  return '/account/jobs';
};

export class AuthOAuth extends Component {
  componentDidMount() {
    docCookies.setItem('redirectTo', buildRedirectPath(this.props.routing));
  }

  render() {
    const { routing } = this.props;

    return (
      <OAuthButtonContainer>
        <GoogleButton href={`/auth/google/${routing.search}`}>
          <GoogleIcon />
          <OAuthButtonText>Continue with Google</OAuthButtonText>
        </GoogleButton>
        <FacebookButton href={`/auth/facebook/${routing.search}`}>
          <FacebookIcon />
          <OAuthButtonText>Continue with Facebook</OAuthButtonText>
        </FacebookButton>
        <GithubButton href={`/auth/github/${routing.search}`}>
          <GithubIcon />
          <OAuthButtonText>Continue with Github</OAuthButtonText>
        </GithubButton>
      </OAuthButtonContainer>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.locationBeforeTransitions || {}
});

export default connect(mapStateToProps)(AuthOAuth);

const OAuthButtonContainer = styled.div`padding-bottom: 1rem;`;

const OAuthButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  height: 60px;
  border-radius: 2px;
  max-width: 456px;
  text-decoration: none;
  color: white;
  padding: 0 1rem;
  transition: background-color, border-color,
    0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  ${media.phablet`
    height: 54px;
    margin-bottom: 10px;
  `};
`;

const OAuthButtonText = styled.p`
  position: relative;
  top: 2px;
  padding-left: 1rem;

  ${media.phablet`
    font-size: 14px;
  `};
`;

const GoogleButton = styled(OAuthButton)`
  background-color: white;
  color: #6c6c6c;
  border: 1px solid #c5c4c4;

  &:hover {
    background-color: #f7f7f7;
  }

  svg {
    ${media.phablet`
      width: 22px;
    `};
  }
`;

const FacebookButton = styled(OAuthButton)`
  background-color: #3b5997;

  &:hover {
    background-color: #344e84;
  }

  svg {
    ${media.phablet`
      width: 22px;
    `};
  }
`;

const GithubButton = styled(OAuthButton)`
  background-color: #24292e;

  &:hover {
    background-color: #1b2025;
  }

  svg {
    ${media.phablet`
      width: 22px;
    `};
  }
`;
