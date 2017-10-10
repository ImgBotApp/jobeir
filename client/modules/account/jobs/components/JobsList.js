// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { formValueSelector } from 'redux-form';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import JobsListItem from './JobsListItem';
import fuse from 'fuse.js';

const filterJobs = (job: { state: string }, filter: string) => {
  if (filter === 'all jobs') return true;
  return job.state === filter;
};

class JobsList extends Component {
  render() {
    let { jobs } = this.props;
    const { filter, searchFilter } = this.props;

    if (searchFilter) {
      const fuseInstance = new fuse(jobs, {
        distance: 50,
        keys: ['title', 'employmentType', 'role.label', 'state'],
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.5
      });

      jobs = fuseInstance.search(searchFilter);
    }

    return (
      <JobsListContainer>
        <JobsBodyList>
          {jobs.filter(job => filterJobs(job, filter)).map(job => (
            <JobsBody
              key={job._id}
              onClick={() => browserHistory.push(`/account/jobs/${job._id}`)}
            >
              <JobsListItem job={job} />
            </JobsBody>
          ))}
        </JobsBodyList>
      </JobsListContainer>
    );
  }
}

const selector = formValueSelector('jobs-filter');

const mapStateToProps = state => ({
  filter: state.account.jobs.filter.toLowerCase(),
  searchFilter: selector(state, 'search')
});

export default connect(mapStateToProps)(JobsList);

const JobsListContainer = styled.div``;

const JobsBodyList = styled.ul`
  list-style: none;
  max-width: 1062px;
  width: 100%;
  margin: 40px auto 0;
  padding-bottom: 80px;

  ${media.tablet`
    margin: 30px auto 0;
  `};
`;

const JobsBody = styled.li`
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  &:last-child {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 20px;
    padding-bottom: 20px;
  `};

  ${media.phablet`
    margin-bottom: 14px;
    padding-bottom: 14px;
  `};
`;
