import React from 'react';
import { connect } from 'react-redux';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import CompanyForm from '../../../user-input/forms/form/CompanyForm';
import JobForm from '../../../user-input/forms/form/JobForm';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
const JobNew = () => {
  return (
    <div>
      <div>New Job</div>
      <CompanyForm />
      <JobForm />
    </div>
  );
};

export default AuthWrapper(JobNew);