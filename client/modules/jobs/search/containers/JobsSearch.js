// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import { serverGetJobs } from '../server/';
import { shouldGetJobs, searchJobs, resetJobs } from '../ducks/';
import JobsSearchPosting from '../components/JobsSearchPosting';

/**
 * Loading jobs from the server on initial load. This will SSR the first
 * jobs posts and allow infinite scroll to do the rest
 */
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
  state: {
    hasMore: boolean
  };

  constructor(props) {
    super(props);
    this.state = { hasMore: true };
  }

  componentDidMount() {
    const { dispatch, jobs: { isLoaded }, query } = this.props;
    const queryData = queryString.stringify(query);

    // Only load jobs on mount if the jobs haven't been rendered
    if (!isLoaded) {
      dispatch(searchJobs(queryData));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetJobs());
  }

  loadMoreJobs = () => {
    const {
      dispatch,
      jobs: { count, isFetching, isLoaded },
      query
    } = this.props;
    const currentStart = parseInt(query.start, 10) || 0;
    // Creating a new updated query with the correct start position
    const updatedQuery = queryString.stringify({
      l: query.l,
      q: query.q,
      start: currentStart + 15,
      lat: query.lat,
      lng: query.lng
    });

    /**
     * Setting state to now load more job postings if there are no more
     * postings to retrieve from the server
     */
    if (currentStart + 15 > count) {
      return this.setState({ hasMore: false });
    }

    if (!isFetching && isLoaded) {
      dispatch(searchJobs(updatedQuery));
      browserHistory.replace(`/jobs/?${updatedQuery}`);
    }
  };

  /**
   * buildJobPostings
   * <InfiniteScroll /> expects an array of React elements to be passed as
   * children so we have to create an array and push all the job postings
   * items into it. This will render the list within the UI
   */
  buildJobPostings() {
    return this.props.jobs.postings.map(posting =>
      <JobsSearchPosting key={posting._id} posting={posting} />
    );
  }

  render() {
    return (
      <JobsSearchContainer>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreJobs}
          hasMore={this.state.hasMore}
          loader={<div className="loader">Loading ...</div>}
        >
          {this.buildJobPostings()}
        </InfiniteScroll>
      </JobsSearchContainer>
    );
  }
}

const mapStateToProps = state => ({
  query:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.query,
  jobs: state.search.jobs
});

export default connect(mapStateToProps)(JobsSearch);

const JobsSearchContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
