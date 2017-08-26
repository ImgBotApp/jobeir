// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { formValueSelector } from 'redux-form';
import styled from 'styled-components';
import JostListItem from './JobsListItem';
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
      <div>
        {jobs.filter(job => filterJobs(job, filter)).map(job =>
          <JobsBody
            key={job._id}
            onClick={() => browserHistory.push(`/account/jobs/${job._id}`)}
          >
            <JostListItem job={job} />
          </JobsBody>
        )}
      </div>
    );
  }
}

const selector = formValueSelector('jobs-filter');

const mapStateToProps = state => ({
  filter: state.account.jobs.filter.toLowerCase(),
  searchFilter: selector(state, 'search')
});

export default connect(mapStateToProps)(JobsList);

const JobsBody = styled.ul`
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;
