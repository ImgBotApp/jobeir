import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CompanyForm from '../../../user-input/forms/form/CompanyForm';
import JobForm from '../../../user-input/forms/form/JobForm';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
class StepForm extends Component {
  render() {
    return (
      <StepFormContainer>
          {
            this.props.params.step === 'job'
              ? <JobForm />
              : <CompanyForm />
          }
      </StepFormContainer>
    );
  }
};

const mapStateToProps = state => ({
  company: state.company,
});

export default connect(mapStateToProps)(StepForm);

const StepFormContainer = styled.div`
  width: 53%;
`;