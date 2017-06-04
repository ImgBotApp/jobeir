import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CompanyOnboarding from '../../company/components/CompanyOnboarding';
import CompanyForm from '../../../user-input/forms/form/company/CompanyForm';
import CompanyUpload
  from '../../../user-input/forms/form/company/CompanyUpload';
import JobForm from '../../../user-input/forms/form/job/JobForm';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
class StepForm extends Component {
  render() {
    const { params } = this.props;
    const isCompany = params.create === 'company';
    const isJob = params.create === 'job';
    const isUpload = params.step === 'upload';

    return (
      <StepFormContainer>
        {isCompany && params.step === 'onboarding' && <CompanyOnboarding />}
        {isJob && <JobForm />}
        {isCompany && <CompanyForm />}
        {isCompany && isUpload && <CompanyUpload params={params} />}
      </StepFormContainer>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps)(StepForm);

const StepFormContainer = styled.div`
  width: 52.5%;
`;
