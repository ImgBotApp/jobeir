import React from 'react';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';

const PrimaryNav = () => {
  return (
    <nav role="navigation">
      <PrimaryNavLogo />
      <PrimaryNavLinks />
    </nav>
  );
};

export default PrimaryNav;