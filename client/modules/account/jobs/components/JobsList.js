import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import JostListItem from './JobsListItem';

const JobsList = ({ jobs, filter }) => {
  return (
    <div>
      {jobs
        .filter(job => {
          if (filter === 'all jobs') return true;
          return job.state === filter;
        })
        .map(job => {
          return (
            <JobsBody
              onClick={() => browserHistory.push(`/account/jobs/${job._id}`)}
              key={job._id}
            >
              <JostListItem job={job} />
            </JobsBody>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.jobs.filter.toLowerCase()
});

export default connect(mapStateToProps)(JobsList);

const JobsBody = styled.ul`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;
