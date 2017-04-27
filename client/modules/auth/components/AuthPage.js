import React from 'react';
import styled from 'styled-components';

export const AuthPage = props => (
  <AuthPageContainer>
    {props.children}
  </AuthPageContainer>
);

export default AuthPage;

const AuthPageContainer = styled.div`
  max-width: 400px;
  margin: 60px auto;
`;
