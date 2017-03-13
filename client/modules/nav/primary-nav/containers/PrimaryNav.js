import React from 'react';

import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';
import PrimaryNavNav from '../components/PrimaryNavNav';

const PrimaryNav = () => {
  return (
    <nav>
      <PrimaryNavLogo />
      <PrimaryNavLinks />
    </nav>
  );
};

export default PrimaryNav;