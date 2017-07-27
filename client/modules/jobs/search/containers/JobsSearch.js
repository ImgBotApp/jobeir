import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { serverGetJobs } from '../server/';
import { shouldGetJobs, searchJobs, resetJobs } from '../ducks/';
import queryString from 'query-string';
import SearchForm from '../../../user-input/forms/form/search/SearchForm';
import InfiniteScroll from 'react-infinite-scroller';
import JobsSearchList from './JobsSearchList';
import JobsSearchListItem from '../components/JobsSearchListItem';

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
  constructor(props) {
    super(props);
    this.state = { hasMore: true };
  }

  componentDidMount() {
    const { dispatch, jobs: { isLoaded }, query } = this.props;
    const queryData = queryString.stringify(query);

    if (!isLoaded) {
      dispatch(searchJobs(queryData));
    }
  }

  componentWillUnmount() {
    console.log('fired componentWillUnmount');
    this.props.dispatch(resetJobs());
  }

  loadMoreJobs() {
    const {
      dispatch,
      jobs: { count, isFetching, isLoaded },
      query
    } = this.props;
    const currentStart = parseInt(query.start, 10) || 0;
    const queryData = queryString.stringify(query);
    const updatedQuery = queryString.stringify({
      l: query.l,
      q: query.q,
      start: currentStart + 15,
      lat: query.lat,
      lng: query.lng
    });

    console.log({ currentStart, count });
    if (currentStart + 15 > count) {
      return this.setState({ hasMore: false });
    }

    if (!isFetching && isLoaded) {
      dispatch(searchJobs(updatedQuery));
      browserHistory.replace(`/jobs/?${updatedQuery}`);
    }
  }

  render() {
    var items = [];

    this.props.jobs.postings.map(posting => {
      items.push(<JobsSearchListItem key={Math.random()} posting={posting} />);
    });

    return (
      <JobsSearchContainer>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreJobs.bind(this)}
          hasMore={this.state.hasMore}
          loader={<div className="loader">Loading ...</div>}
        >
          {items}
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
