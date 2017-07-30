import React from 'react';
import styled from 'styled-components';
import PrimaryNav from '../../nav/primary-nav/containers/PrimaryNav';

const Header = () =>
  <HeaderContainer>
    <PrimaryNav />
  </HeaderContainer>;

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
`;
