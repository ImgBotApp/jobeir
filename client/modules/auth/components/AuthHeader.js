// @flow
import React from 'react';
import styled from 'styled-components';

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
`;

const AuthHeaderHeader = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-wieght: 800;
`;
