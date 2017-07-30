// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import docCookies from '../../../utils/cookies';

class Redirect extends Component {
  componentDidMount() {
    /**
     * Client side redirect depending on the continue path of the
     * login form. A cookie is set when the user logs in and then
     * it's checked on this redirect page. This is to make it easier
     * to redirect users using oauth
     */
    if (typeof document !== 'undefined') {
      const redirectTo: string = docCookies.getItem('redirectTo');
      docCookies.removeItem('redirectTo');

      // default redirect is /account/jobs
      browserHistory.push(redirectTo || '/account/jobs');
    }
  }

  render() {
    return <RedirectContainer>Authenticating...</RedirectContainer>;
  }
}

export default Redirect;

const RedirectContainer = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 60px auto;
`;
