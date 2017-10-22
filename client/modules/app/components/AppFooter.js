// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { media } from '../../../styles/breakpoints';

const AppFooter = () => (
  <AppFooterContainer>
    <AppFooterContent>
      <AppFooterList>
        <AppFooterListItem>
          <StyledLink to="/who-we-are">Who we are</StyledLink>
        </AppFooterListItem>
        <AppFooterListItem>
          <StyledLink to="/contact-us">Contact us</StyledLink>
        </AppFooterListItem>
      </AppFooterList>
      <AppFooterList>
        <AppFooterListItem>
          <StyledLink to="/privacy-policy">Privacy policy</StyledLink>
        </AppFooterListItem>
        <AppFooterListItem>
          <StyledLink to="/terms-of-use">Terms of use</StyledLink>
        </AppFooterListItem>
      </AppFooterList>
      <AppFooterList>
        <AppFooterListItem>
          <StyledLink to="/pricing">Pricing</StyledLink>
        </AppFooterListItem>
      </AppFooterList>
    </AppFooterContent>
  </AppFooterContainer>
);

export default AppFooter;

const AppFooterContainer = styled.div`background: #f9f8f7;`;

const AppFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 520px;
  margin: 0 auto;
  padding: 75px 0 125px;

  ${media.phablet`
    flex-direction: column;
    justify-content: center;
    padding: 50px 0;
  `};
`;

const AppFooterList = styled.ul`list-style: none;`;

const AppFooterListItem = styled.li`
  opacity: 0.62;
  margin-bottom: 15px;

  ${media.phablet`
    margin-bottom: 25px;
    text-align: center;
  `};
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.black};
  text-decoration: none;

  ${media.phablet`
    margin-bottom: 20px;
    padding: 6px;
  `};
`;
