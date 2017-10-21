// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

export const AuthFooter = (props: { link: string, text: string }) => (
  <AuthFooterContainer>
    <StyledLink to={props.link}>{props.text}</StyledLink>
  </AuthFooterContainer>
);

export default AuthFooter;

const AuthFooterContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};

  &:hover {
    color: ${props => props.theme.colors.purple};
  }
`;
