// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import HomeSearch from './HomeSearch';

const HomeHeader = () =>
  <Header>
    <HeaderText>
      Find your next job<br /> Lorem inspum jonadabom
    </HeaderText>
    <HomeSearch />
  </Header>;

export default HomeHeader;

const Header = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 0;

  ${media.desktop`
    padding: 30px 20px;
  `};

  ${media.tablet`
    padding: 20px;
  `};
`;

const HeaderText = styled.h1`
  font-size: 46px;
  font-weight: 900;
  text-align: center;

  ${media.desktop`
    font-size: 40px;
  `};

  ${media.tablet`
    font-size: 36px;
  `};

  ${media.phablet`
    font-size: 30px;
  `};

  ${media.phone`
    font-size: 24px;
    font-weight: 800;
    text-align: left;
    margin: 15px auto 30px;
    line-height: 1.4;
  `};
`;
