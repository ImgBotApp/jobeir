// @flow
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import JostListItem from './JobsListItem';

const filterJobs = (job: { state: string }, filter: string) => {
  if (filter === 'all jobs') return true;
  return job.state === filter;
};

const JobsList = (props: { jobs: { filter: Array<{}> }, filter: string }) => {
  const { jobs, filter } = props;

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
};

const mapStateToProps = state => ({
  filter: state.account.jobs.filter.toLowerCase()
});

export default connect(mapStateToProps)(JobsList);

const JobsBody = styled.ul`
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;
