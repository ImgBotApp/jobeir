import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getJob } from '../../../../create/job/ducks/';
import JobEditForm from '../../../../user-input/forms/form/JobEditForm';

class Posting extends Component {
  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  render() {
    const { params, jobs } = this.props;
    const activePosting = jobs.postings.find(
      posting => posting._id === params.jobId
    );

    return (
      <PostingContainer>
        Posting
        <JobEditForm initialValues={activePosting} />
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
  width: 480px;
  margin: 0 auto;
`;
