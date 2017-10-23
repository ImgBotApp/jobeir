// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

export const AuthPage = (props: { children: any }) => (
  <AuthPageContainer>{props.children}</AuthPageContainer>
);

export default AuthPage;

const AuthPageContainer = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 100px auto;
  min-height: 50vh;

  ${media.tablet`
    padding: 0 24px;
    margin: 40px auto;
  `};

  ${media.phablet`
    margin: 30px auto;
  `};
`;
