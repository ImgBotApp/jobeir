import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import JostListItem from './JobsListItem';

const JobsList = ({ jobs }) => {
  return (
    <div>
      {jobs.map(job => {
        return (
          <JobsBody
            onClick={() => browserHistory.push(`dashboard/jobs/${id}`)}
            key={job._id}
          >
            <JostListItem job={job} />
          </JobsBody>
        );
      })}
    </div>
  );
};

export default JobsList;

const JobsBody = styled.ul`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;
