import React from 'react';
import PrimaryNav from '../../nav/primary-nav/containers/PrimaryNav';
import styled from 'styled-components';

const LightHeader = styled.header`
  background-color: #f9f9f9;
`;

const Header = () => {
  return (
    <LightHeader>
      <PrimaryNav />
    </LightHeader>
  );
};

export default Header;