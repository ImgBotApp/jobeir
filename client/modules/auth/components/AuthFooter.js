import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

export const AuthFooter = props => (
  <AuthFooterContainer>
    <Link to={props.link}>{props.text}</Link>
  </AuthFooterContainer>
);

export default AuthFooter;

const AuthFooterContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;
