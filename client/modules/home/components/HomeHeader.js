// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import HomeSearch from './HomeSearch';

const HomeHeader = (props: { showHeaderText: true }) => (
  <Header>
    {props.showHeaderText && (
      <HeaderText>
        Find the best jobs<br />in the growing tech industry
      </HeaderText>
    )}
    <HomeSearch />
  </Header>
);

export default HomeHeader;

const Header = styled.div`
  max-width: 860px;
  margin: 0 auto 50px;
  padding: 80px 0 50px;
  line-height: 1.1;

  ${media.desktop`
    padding: 30px 24px;
  `};

  ${media.tablet`
    padding: 24px;
  `};
`;

const HeaderText = styled.h1`
  font-size: 52px;
  font-weight: 900;
  text-align: center;
  line-height: 1.2;
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 40px;

  ${media.desktop`
    font-size: 40px;
  `};

  ${media.phablet`
    font-size: 34px;
  `};

  ${media.phone`
    font-size: 32px;
    text-align: left;
    margin: 0px auto 30px;
    line-height: 1.3;
  `};
`;
