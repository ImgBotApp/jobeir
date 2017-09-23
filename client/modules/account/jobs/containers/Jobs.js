// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getJobs } from '../../../account/create/job/ducks/';
import JobsFilter from './JobsFilter';
import JobsList from '../components/JobsList';
import JobsListItemPlaceholder from '../components/JobsListItemPlaceholder';
import JobsListEmptyState from '../components/JobsListEmptyState';
import { FadeIn } from '../../../../styles/animate/';

const byEarliestFirst = (a, b) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

/**
 * <Jobs />
 * Currently this jobs container serves as the main dashboard for the
 * authenticated admin section. It is used to display all the jobs
 * and the filter for them
 */
class Jobs extends Component {
  componentDidMount() {
    const { companies, dispatch, jobs } = this.props;

    /**
     * This is not "< 0" because it's possible to have a single job posting
     * within redux by previewing a job post before going to the jobs admin
     * view
     */
    if (jobs.postings.length <= 1) {
      dispatch(getJobs(companies.activeCompany._id));
    }
  }

  componentWillUpdate(nextProps) {
    const { companies, dispatch } = this.props;

    // If the active company gets updated we have to call get jobs again
    if (nextProps.companies.activeCompany._id !== companies.activeCompany._id) {
      dispatch(getJobs(nextProps.companies.activeCompany._id));
    }
  }

  render() {
    const { companies, jobs, globalIsLoaded } = this.props;
    const hasJobPostings: number = jobs.postings.length;
    const companyId: string = companies.activeCompany._id;
    const link: string = companyId
      ? `/create/job/about/${companyId}`
      : '/create/company/about';

    return (
      <JobsContainer>
        <JobsFilter />
        <JobsContent>
          {jobs.isFetching ? (
            <JobsListItemPlaceholder />
          ) : hasJobPostings ? (
            <FadeIn>
              <JobsList jobs={jobs.postings.sort(byEarliestFirst)} />
            </FadeIn>
          ) : (
            globalIsLoaded && <JobsListEmptyState link={link} />
          )}
        </JobsContent>
      </JobsContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs,
  globalIsLoaded: state.session.auth.globalIsLoaded
});

export default connect(mapStateToProps)(Jobs);

const JobsContainer = styled.div`max-width: 100%;`;

const JobsContent = styled.div``;
