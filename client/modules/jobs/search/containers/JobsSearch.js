import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { serverGetJobs } from '../server/';
import { shouldGetJobs, searchJobs } from '../ducks/';
import queryString from 'query-string';
import JobsSearchList from './JobsSearchList';
import SearchForm from '../../../user-input/forms/form/search/SearchForm';

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
class JobsSearch extends Component {
  componentDidMount() {
    const { dispatch, isLoaded, query } = this.props;
    const queryData = queryString.stringify(query);

    if (!isLoaded) {
      dispatch(searchJobs(queryData));
    }
  }

  render() {
    return (
      <JobsSearchContainer>
        <JobsSearchList />
      </JobsSearchContainer>
    );
  }
}

const mapStateToProps = state => ({
  query:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.query,
  isLoaded: state.search.jobs.isLoaded
});

export default connect(mapStateToProps)(JobsSearch);

const JobsSearchContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
