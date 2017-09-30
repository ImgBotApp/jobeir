import React from 'react';
import Link from 'react-router/lib/Link';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AppHead from '../../app/components/AppHead';

const NotFound = () => (
  <NotFoundContainer>
    <AppHead title="Not Found" />
    <div>
      <NotFoundHeader>
        <NotFoundHeaderTop>404</NotFoundHeaderTop>
        <NotFoundHeaderBottom>Page Not Found</NotFoundHeaderBottom>
      </NotFoundHeader>
      <StyledLink to="/">Home</StyledLink>
    </div>
  </NotFoundContainer>
);

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60vh;
  text-align: center;
`;

const NotFoundHeader = styled.h1`
  display: flex;
  flex-direction: column;
  font-weight: 900;
  margin-bottom: 50px;

  ${media.tablet`
    margin-bottom: 30px;
  `};
`;

const NotFoundHeaderTop = styled.span`
  font-size: 172px;
  line-height: 0.9;

  ${media.tablet`
    font-size: 120px;
  `};
`;

const NotFoundHeaderBottom = styled.span`
  font-size: 40px;

  ${media.tablet`
    font-size: 28px;
  `};
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 86px;
  width: 86px;
  color: ${props => props.theme.colors.purple};
  border: 2px solid ${props => props.theme.colors.purple};
  border-radius: 50%;
  font-weight: 600;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.purple};
    color: white;
    transition: all 200ms ease-in-out;
  }
`;
