// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { serverGetJob } from '../server/';
import { shouldGetJob, getJobPosting, resetJobPosting } from '../ducks/';
import AppHead from '../../../app/components/AppHead';
import JobPosting from '../../../account/jobs/posting/containers/JobPosting';
import JobsPostingReturn from '../components/JobsPostingReturn';
import JobsPostingCompany from '../components/JobsPostingCompany';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state = getState();

      if (shouldGetJob(state)) {
        return dispatch(serverGetJob(req.originalUrl, req));
      }
    }
  }
])
class JobsPosting extends Component {
  componentDidMount() {
    const { dispatch, isLoaded, params } = this.props;

    if (!isLoaded) {
      dispatch(getJobPosting(params.jobId));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetJobPosting());
  }

  render() {
    const { params, posting } = this.props;

    return (
      <JobPostingContainer>
        <AppHead
          title={`${posting.title} at ${posting.company.displayName}`}
          description={posting.company.product}
          path={`/jobs/${posting._id}`}
          contentType="article"
          published={posting.createdAt}
          updated={posting.updatedAt}
          image={posting.company.logo}
        />
        <JobsPostingReturn externalLink={posting.externalLink} />
        <JobPosting hideLogo={false} activePosting={posting} params={params} />
        <JobsPostingCompany activePosting={posting} />
      </JobPostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  posting: state.posting.posting,
  isLoaded: state.posting.isLoaded
});

export default connect(mapStateToProps)(JobsPosting);

const JobPostingContainer = styled.div`min-height: 100vh;`;
