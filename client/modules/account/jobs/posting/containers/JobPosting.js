// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJob } from '../../../../account/create/job/ducks/';
import JobPostingHeaderPlaceholder from '../components/JobPostingHeaderPlaceholder';
import JobPostingPreviewPlaceholder from '../components/JobPostingPreviewPlaceholder';
import JobPostingHeader from '../components/JobPostingHeader';
import JobPostingBody from './JobPostingBody';
import JobPostingMap from './JobPostingMap';
import FadeIn from '../../../../../styles/components/FadeIn';

/**
 * <Posting />
 * Provides the UI for previewing the posting within the Admin or
 * toggling to edit the posting.
 */
class JobPosting extends Component {
  componentDidMount() {
    const { companies, dispatch, params } = this.props;
    dispatch(getJob(companies.activeCompany._id, params.jobId));
  }

  render() {
    const { jobs, params } = this.props;
    const activePosting: {} =
      jobs.postings.find(posting => posting._id === params.jobId) || {};

    const activePostingReady: boolean = Object.keys(activePosting).length > 0;

    return (
      <JobPostingContainer>
        {activePostingReady
          ? <FadeIn>
              <JobPostingHeader activePosting={activePosting} />
              <JobPostingBody activePosting={activePosting} />
              <JobPostingMap activePosting={activePosting} />
            </FadeIn>
          : <JobPostingPlaceholderContainer>
              <JobPostingHeaderPlaceholder />
              <JobPostingPreviewPlaceholder />
            </JobPostingPlaceholderContainer>}
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

const JobPostingPlaceholderContainer = styled.div`
  max-width: 670px;
  margin: 0 auto;
`;
