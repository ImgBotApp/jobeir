// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { media } from '../../../styles/breakpoints';
import { JobeirLogo } from '../../../icons';

const AppFooter = () => (
  <AppFooterContainer>
    <AppFooterContent>
      <JobeirLogo height={32} />
      <div>
        <AppFooterListHeader>Company</AppFooterListHeader>
        <AppFooterList>
          <AppFooterListItem>
            <StyledLink to="/who-we-are">Who we are</StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink to="/contact-us">Contact us</StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink to="/brand">Brand guidelines</StyledLink>
          </AppFooterListItem>
        </AppFooterList>
      </div>
      <div>
        <AppFooterListHeader>Product</AppFooterListHeader>
        <AppFooterList>
          <AppFooterListItem>
            <StyledLink to="/why-jobeir">Why Jobeir?</StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink to="/pricing">Pricing</StyledLink>
          </AppFooterListItem>
        </AppFooterList>
      </div>
      <div>
        <AppFooterListHeader>Social</AppFooterListHeader>
        <AppFooterList>
          <AppFooterListItem>
            <StyledLink target="_blank" to="https://twitter.com/jobeirofficial">
              Twitter
            </StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink
              target="_blank"
              to="https://www.instagram.com/jobeirofficial/"
            >
              Instagram
            </StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink target="_blank" to="https://spectrum.chat/jobeir">
              Spectrum
            </StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink target="_blank" to="https://github.com/brotzky/jobeir">
              Github
            </StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink target="_blank" to="https://dribbble.com/brotzky">
              Dribbble
            </StyledLink>
          </AppFooterListItem>
        </AppFooterList>
      </div>
      <div>
        <AppFooterListHeader>Legal</AppFooterListHeader>
        <AppFooterList>
          <AppFooterListItem>
            <StyledLink to="/privacy-policy">Privacy policy</StyledLink>
          </AppFooterListItem>
          <AppFooterListItem>
            <StyledLink to="/terms-of-service">Terms of Service</StyledLink>
          </AppFooterListItem>
        </AppFooterList>
      </div>
    </AppFooterContent>
  </AppFooterContainer>
);

export default AppFooter;

const AppFooterContainer = styled.div`
  background: ${props => props.theme.colors.grey.bg};
`;

const AppFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  padding: 100px 0 125px;

  ${media.phablet`
    flex-direction: column;
    justify-content: center;
    padding: 50px 0;
  `};
`;

const AppFooterList = styled.ul`list-style: none;`;

const AppFooterListHeader = styled.h5`
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 20px;
`;

const AppFooterListItem = styled.li`
  opacity: 0.55;
  margin-bottom: 15px;
  transition: opacity 220ms ease;

  &:hover {
    opacity: 0.88;
  }

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
