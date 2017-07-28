import React from 'react';
import styled from 'styled-components';
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
  max-width: 1140px;
  margin: 0 auto;
  padding: 50px 0;
`;

const HeaderText = styled.h1`
  font-size: 52px;
  font-weight: 900;
  text-align: center;
`;
