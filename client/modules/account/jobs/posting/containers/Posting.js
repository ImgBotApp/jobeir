import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getJob } from '../../../../create/job/ducks/';

class Posting extends Component {
  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  render() {
    return (
      <PostingContainer>
        Posting
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
  width: 100%;
  margin: 0 auto;
`;
