import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { serverGetJobs } from '../server/';
import { shouldGetJobs } from '../ducks/';
import JobsList from './JobsList';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state = getState();

      if (shouldGetJobs(state)) {
        return dispatch(serverGetJobs(req.query, req));
      }
    }
  }
])
class Jobs extends Component {
  render() {
    return (
      <JobsContainer>
        Jobs
        <JobsList />
      </JobsContainer>
    );
  }
}

export default Jobs;

const JobsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
