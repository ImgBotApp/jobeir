import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';
import CompanyForm from '../../../user-input/forms/form/CompanyForm';
import JobForm from '../../../user-input/forms/form/JobForm';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
const JobNew = (props) => {
  return (
    <JobNewContainer>
      <JobNewForm>
        {
          props.company.details
            ? <JobForm />
            : <CompanyForm />
        }
      </JobNewForm>
    </JobNewContainer>
  );
};

const mapStateToProps = state => ({
  company: state.company,
});

export default connect(mapStateToProps)(UserWrapper(JobNew));

const JobNewContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const JobNewForm = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;