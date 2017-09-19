// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

export const AuthHeader = (props: { text: string }) =>
  <AuthHeaderContainer>
    <AuthHeaderHeader>
      {props.text}
    </AuthHeaderHeader>
  </AuthHeaderContainer>;

export default AuthHeader;

const AuthHeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;

  ${media.phablet`
    font-size: 22px;
    margin-bottom: 24px;    
  `};
`;

const AuthHeaderHeader = styled.h1`
  text-align: center;
  font-size: 36px;
  font-wieght: 800;

  ${media.tablet`
    font-size: 30px;
  `};

  ${media.phablet`
    font-size: 22px;
  `};
`;
