import React from 'react';
import PrimaryNav from '../../nav/primary-nav/containers/PrimaryNav';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <PrimaryNav />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
`;
