import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      console.log('fire');
    }
  }
])
class Jobs extends Component {
  render() {
    return <JobsContainer>Jobs</JobsContainer>;
  }
}

export default Jobs;

const JobsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
