import React from 'react';
import { Link } from 'react-router';
import UserWrapper from '../../../user/containers/UserWrapper';

const Profile = () => {
  return (
    <div>
      <div>Profile</div>
      <div>
        <Link to="/create/company/about">Create a company</Link>
      </div>
      <div>
        <Link to="/create/job/about">Post a job</Link>
      </div>
    </div>
  );
};

export default UserWrapper(Profile);
