// @flow
import React from 'react';
import styled from 'styled-components';

export const AuthLoading = () =>
  <AuthLoadingContainer>Loading...</AuthLoadingContainer>;

export default AuthLoading;

const AuthLoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
