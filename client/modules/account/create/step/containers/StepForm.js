// @flow
import React from 'react';
import styled from 'styled-components';
import CompanyOnboarding from '../../company/components/CompanyOnboarding';
import CompanyForm from '../../../../user-input/forms/form/company/CompanyForm';
import JobForm from '../../../../user-input/forms/form/job/JobForm';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
const StepForm = (props: { params: { create: string, step: string } }) => {
  const { params } = props;
  const isCompany = params.create === 'company';
  const isJob = params.create === 'job';

  return (
    <StepFormContainer>
      {isCompany && params.step === 'onboarding' && <CompanyOnboarding />}
      {isJob && <JobForm params={params} />}
      {isCompany && <CompanyForm />}
    </StepFormContainer>
  );
};

export default StepForm;

const StepFormContainer = styled.div`width: 52.5%;`;
