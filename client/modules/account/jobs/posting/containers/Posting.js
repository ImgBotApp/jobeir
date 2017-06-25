import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getJob } from '../../../../create/job/ducks/';
import JobEditForm from '../../../../user-input/forms/form/JobEditForm';
import PostingPreview from './PostingPreview';

class Posting extends Component {
  constructor(props) {
    super(props);
    this.state = { renderEdit: false };

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  renderPreviewOrEdit(params, activePosting = {}) {
    return this.state.renderEdit
      ? <JobEditForm initialValues={activePosting} params={params} />
      : <PostingPreview activePosting={activePosting} params={params} />;
  }

  handleEditClick() {
    this.setState({ renderEdit: !this.state.renderEdit });
  }

  render() {
    const { params, jobs } = this.props;
    const activePosting = jobs.postings.find(
      posting => posting._id === params.jobId
    );

    return (
      <PostingContainer>
        <div onClick={this.handleEditClick}>Edit Posting</div>
        {jobs.isFetching && activePosting !== undefined
          ? null
          : this.renderPreviewOrEdit(params, activePosting)}
      </PostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(Posting);

const PostingContainer = styled.div`
  margin-top: 75px;
`;
