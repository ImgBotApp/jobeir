// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJob, deleteJob } from '../../../../account/create/job/ducks/';
import JobEditForm from '../../../../user-input/forms/form/JobEditForm';
import JobPostingPreview from '../components/JobPostingPreview';
import JobPostingHeaderEdit from '../components/JobPostingHeaderEdit';

/**
 * <Posting />
 * Provides the UI for previewing the posting within the Admin or
 * toggling to edit the posting.
 */
class JobPosting extends Component {
  state: {
    renderEdit: boolean
  };

  constructor(props) {
    super(props);
    this.state = { renderEdit: false };
  }

  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  handleEditClick = () => {
    this.setState({ renderEdit: !this.state.renderEdit });
  };

  handleDeleteClick = () => {
    const { companies, dispatch, params } = this.props;
    dispatch(
      deleteJob(companies.activeCompany._id, params.jobId, '/account/jobs')
    );
  };

  // Handles the logc either show the preview or edit components
  renderPreviewOrEdit() {
    const { jobs, params } = this.props;
    const activePosting: {} = jobs.postings.find(
      posting => posting._id === params.jobId
    );

    if (activePosting) {
      return this.state.renderEdit
        ? <JobEditForm initialValues={activePosting} params={params} />
        : <JobPostingPreview activePosting={activePosting} params={params} />;
    }

    return null;
  }

  render() {
    return (
      <JobPostingContainer>
        <JobPostingHeaderEdit
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
        />
        {!this.props.jobs.isFetching && this.renderPreviewOrEdit()}
      </JobPostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(JobPosting);

const JobPostingContainer = styled.div`margin-top: 50px;`;
