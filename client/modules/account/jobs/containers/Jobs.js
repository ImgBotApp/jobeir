// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getJobs } from '../../../account/create/job/ducks/';
import JobsFilter from './JobsFilter';
import JobsList from '../components/JobsList';
import JobsListItemPlaceholder from '../components/JobsListItemPlaceholder';
import FadeIn from '../../../../styles/components/FadeIn';

/**
 * <Jobs />
 * Currently this jobs container serves as the main dashboard for the
 * authenticated admin section. It is used to display all the jobs
 * and the filter for them
 */
class Jobs extends Component {
  componentDidMount() {
    const { companies, dispatch } = this.props;
    dispatch(getJobs(companies.activeCompany._id));
  }

  componentWillUpdate(nextProps) {
    const { companies, dispatch } = this.props;

    // If the active company gets updated we have to call get jobs again
    if (nextProps.companies.activeCompany._id !== companies.activeCompany._id) {
      dispatch(getJobs(nextProps.companies.activeCompany._id));
    }
  }

  render() {
    const { companies, jobs } = this.props;
    const hasJobPostings: number = jobs.postings.length;

    return (
      <div>
        <div>
          <JobsContainer>
            <JobsFilter />
            {jobs.isFetching
              ? <JobsListItemPlaceholder />
              : hasJobPostings
                ? <FadeIn>
                    <JobsList jobs={jobs.postings} />
                  </FadeIn>
                : <Link to={`/create/job/about/${companies.activeCompany._id}`}>
                    Create a job
                  </Link>}
          </JobsContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(Jobs);

const JobsContainer = styled.div`max-width: 100%;`;
