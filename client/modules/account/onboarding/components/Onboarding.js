import React from 'react';
import { Link } from 'react-router';
import UserWrapper from '../../../user/containers/UserWrapper';

const Onboarding = () => {
  return (
    <div>
      <div>Onboarding</div>
      <Link to="/create/company/about">Create a company</Link>
    </div>
  );
};

export default UserWrapper(Onboarding);