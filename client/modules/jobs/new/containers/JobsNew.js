import React from 'react';
import { connect } from 'react-redux';
import AuthWrapper from '../../../auth/containers/AuthWrapper';

const JobNew = () => {
  return (
    <div>New Job</div>
  );
};

export default AuthWrapper(JobNew);