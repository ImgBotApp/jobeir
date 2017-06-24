import React from 'react';
import styled from 'styled-components';
import Search from '../../search/containers/Search';

const HomeHeader = () => (
  <Header>
    <HeaderText>This is the<br /> title looks lorem</HeaderText>
    <Search />
  </Header>
);

export default HomeHeader;

const Header = styled.header`
  max-width: 1140px;
  margin: 0 auto;
  padding: 50px 0;
`;

const HeaderText = styled.h1`
  font-size: 48px;
  font-weight: 900;
`;
