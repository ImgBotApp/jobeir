// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

export const AuthHeader = (props: { text: string }) => (
  <AuthHeaderContainer>
    <AuthHeaderHeader>{props.text}</AuthHeaderHeader>
  </AuthHeaderContainer>
);

export default AuthHeader;

const AuthHeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;

  ${media.phablet`
    margin-bottom: 14px;    
  `};
`;

const AuthHeaderHeader = styled.h1`
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  font-family: ${props => props.theme.fontFamily.tiempos};

  ${media.tablet`
    font-size: 30px;
  `};

  ${media.phablet`
    font-size: 26px;
  `};
`;
