import React from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import docCookies from '../../../utils/cookies';

export const Redirect = props => {
  if (typeof document !== 'undefined') {
    const redirectTo = docCookies.getItem('redirectTo');
    docCookies.removeItem('redirectTo');
    browserHistory.push(redirectTo || '/account/dashboard');
  }

  return (
    <RedirectContainer>
      Authenticating...
    </RedirectContainer>
  );
};

export default Redirect;

const RedirectContainer = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 60px auto;
`;
