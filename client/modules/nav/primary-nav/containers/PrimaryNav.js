import React from 'react';
import styled from 'styled-components';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';
import PrimaryNavNav from '../components/PrimaryNavNav';

const PrimaryNav = () => {
  return (
    <Navigation>
      <PrimaryNavLogo />
      <PrimaryNavLinks />
    </Navigation>
  );
};

export default PrimaryNav;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px;
`;