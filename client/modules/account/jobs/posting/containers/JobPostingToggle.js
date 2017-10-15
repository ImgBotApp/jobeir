// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJob, deleteJob } from '../../../../account/create/job/ducks/';
import JobEditForm from '../../../../user-input/forms/form/JobEditForm';
import JobPosting from './JobPosting';
import JobPostingToggleControls from '../components/JobPostingToggleControls';

/**
 * <Posting />
 * Provides the UI for previewing the posting within the Admin or
 * toggling to edit the posting.
 */
class JobPostingToggle extends Component {
  state: {
    showJobForm: boolean
  };

  constructor(props) {
    super(props);
    this.state = { showJobForm: false };
  }

  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  handleEditClick = () => {
    this.setState({ showJobForm: !this.state.showJobForm });
  };

  handleDeleteClick = () => {
    const { companies, dispatch, params } = this.props;
    dispatch(
      deleteJob(companies.activeCompany._id, params.jobId, '/account/jobs')
    );
  };

  render() {
    const { jobs, params } = this.props;
    const activePosting: {} =
      jobs.postings.find(posting => posting._id === params.jobId) || {};

    return (
      <JobPostingContainer>
        <JobPostingToggleControls
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
        />
        {this.state.showJobForm ? (
          <JobEditForm initialValues={activePosting} params={params} />
        ) : (
          <JobPosting activePosting={activePosting} params={params} />
        )}
      </JobPostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(JobPostingToggle);

const JobPostingContainer = styled.div`margin-top: 50px;`;
