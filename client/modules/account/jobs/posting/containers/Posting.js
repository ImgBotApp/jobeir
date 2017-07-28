import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJob, deleteJob } from '../../../../account/create/job/ducks/';
import JobEditForm from '../../../../user-input/forms/form/JobEditForm';
import PostingPreview from '../components/PostingPreview';
import PostingHeader from '../components/PostingHeader';

/**
 * <Posting />
 * Provides the UI for previewing the posting within the Admin or
 * toggling to edit the posting.
 */
class Posting extends Component {
  constructor(props) {
    super(props);
    this.state = { renderEdit: false };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  // Handles the logc either show the preview or edit components
  renderPreviewOrEdit() {
    const { jobs, params } = this.props;
    const activePosting = jobs.postings.find(
      posting => posting._id === params.jobId
    );

    if (activePosting) {
      return this.state.renderEdit
        ? <JobEditForm initialValues={activePosting} params={params} />
        : <PostingPreview activePosting={activePosting} params={params} />;
    }
  }

  handleEditClick() {
    this.setState({ renderEdit: !this.state.renderEdit });
  }

  handleDeleteClick() {
    const { companies, dispatch, params } = this.props;
    dispatch(
      deleteJob(companies.activeCompany._id, params.jobId, '/account/jobs')
    );
  }

  render() {
    return (
      <PostingContainer>
        <PostingHeader
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
        />
        {!this.props.jobs.isFetching && this.renderPreviewOrEdit()}
      </PostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(Posting);

const PostingContainer = styled.div`margin-top: 50px;`;
