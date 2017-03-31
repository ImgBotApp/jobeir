import React from 'react';
import styled from 'styled-components';

const HomeHeader = () =>
  <Header>
    <HeaderText>Find your next job in tech</HeaderText>
  </Header>

export default HomeHeader;

const Header = styled.header`
  
`;

const HeaderText = styled.header`
  font-size: 48px;
  font-weight: 800;
`;