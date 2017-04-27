import React from 'react';
import { Link } from 'react-router';
import UserWrapper from '../../../user/containers/UserWrapper';

const Profile = () => {
  return (
    <div>
      <div>Profile</div>
      <Link to="/create/company/about">Create a company</Link>
    </div>
  );
};

export default UserWrapper(Profile);
