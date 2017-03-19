import React from 'react';
import { connect } from 'react-redux';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import CompanyForm from '../../../user-input/forms/form/CompanyForm';

const JobNew = () => {
  return (
    <div>
      <div>New Job</div>
      <CompanyForm />
    </div>
  );
};

export default AuthWrapper(JobNew);