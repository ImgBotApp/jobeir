// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import { serverGetJobs } from '../server/';
import {
  shouldGetJobs,
  searchJobs,
  resetJobs,
  filterSearchJobs
} from '../ducks/';
import JobsSearchSidebar from './JobsSearchSidebar';
import JobsSearchPosting from '../components/JobsSearchPosting';
import JobsSearchFilterReset from '../components/JobsSearchFilterReset';
import FadeIn from '../../../../styles/components/FadeIn';
import JobsSearchPostingLoader from '../components/JobsSearchPostingLoader';
import { BoxIcon } from '../../../../icons';

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
    hasMore: boolean,
    initialValues: {}
  };

  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.search);
    const initialValues = {
      location: parsed.l,
      title: parsed.q,
      lat: parsed.lat,
      lng: parsed.lng,
      employmentType: parsed.et,
      equity: parsed.eq,
      distance: parsed.d,
      remote: parsed.r,
      companySize: parsed.cs
    };

    this.state = { hasMore: false, initialValues };
  }

  componentDidMount() {
    const { dispatch, jobs: { isLoaded }, query } = this.props;
    const queryData = queryString.stringify(query);

    // Only load jobs on mount if the jobs haven't been rendered
    if (!isLoaded) {
      dispatch(searchJobs(queryData));
    }
  }

  componentDidUpdate(prevProps) {
    const { query, dispatch } = this.props;
    const prev = this.withoutStartQuery(prevProps.query);
    const curr = this.withoutStartQuery(query);

    if (prev !== curr && Object.keys(query).length) {
      dispatch(filterSearchJobs(queryString.stringify(query)));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetJobs());
  }

  /**
   * withoutStartQuery()
   * Removes the start 's' query from the query string by default
   * and returns a JSON stringified version for simple comparison
   */
  withoutStartQuery = (obj: {}, prop: string = 's'): string => {
    const res = Object.assign({}, obj);
    delete res[prop];
    return JSON.stringify(res);
  };

  /**
   * loadMoreJobs()
   * Handles loading more jobs when the user gets to the bottom of the
   * inifinite scroll component. It will updating the query after searching
   * and also handle the state for keeping track of the number of jobs
   * that are left to search for.
   */
  loadMoreJobs = (): void => {
    const {
      dispatch,
      jobs: { count, isFetching, isLoaded },
      query
    } = this.props;
    const currentStart = parseInt(query.s, 10) || 0;
    // Creating a new updated query with the correct start position
    const updatedQuery = queryString.stringify({
      l: query.l,
      q: query.q,
      s: currentStart + 20,
      lat: query.lat,
      lng: query.lng
    });

    /**
     * Setting state to now load more job postings if there are no more
     * postings to retrieve from the server
     */
    if (currentStart + 20 > count && isLoaded) {
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
    const { jobs: { postings, count, isFetching } } = this.props;
    const { hasMore } = this.state;

    if (count) {
      return (
        <FadeIn>
          {postings.map(posting =>
            <JobsSearchPosting key={posting._id} posting={posting} />
          )}
          {!hasMore &&
            !isFetching &&
            <JobSearchResultsEnd>No more search results</JobSearchResultsEnd>}
        </FadeIn>
      );
    }

    return isFetching
      ? null
      : <JobSearchEmptyState>
          <BoxIcon />
          <JobSearchEmptyStateHeader>
            We couldn't find any job posts
          </JobSearchEmptyStateHeader>
        </JobSearchEmptyState>;
  }

  render() {
    const { initialValues } = this.state;

    return (
      <JobsSearchContainer>
        <JobsSearchBackground>
          <JobsSearchBackgroundGrey />
          <JobsSearchBackgroundWhite />
        </JobsSearchBackground>
        <JobsSearchRow>
          <JobsSearchColumn margin>
            <JobsSearchHeader>
              <JobsSearchHeaderText>Filter options</JobsSearchHeaderText>
              <JobsSearchFilterReset />
            </JobsSearchHeader>
            <JobsSearchSidebar initialValues={initialValues} />
          </JobsSearchColumn>
          <JobsSearchColumn wide>
            <JobsSearchHeader wide>
              <JobsSearchHeaderText>
                Search results ({this.props.jobs.count})
              </JobsSearchHeaderText>
            </JobsSearchHeader>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMoreJobs}
              hasMore={this.state.hasMore}
              loader={<JobsSearchPostingLoader />}
            >
              {this.buildJobPostings()}
            </InfiniteScroll>
          </JobsSearchColumn>
        </JobsSearchRow>
      </JobsSearchContainer>
    );
  }
}

const mapStateToProps = state => ({
  query:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.query,
  search:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.search,
  jobs: state.search.jobs
});

export default connect(mapStateToProps)(JobsSearch);

const JobsSearchContainer = styled.div`
  padding-top: 30px;
  min-height: calc(100vh - 75px);
`;

const JobsSearchBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  z-index: -1;
`;

const JobsSearchBackgroundGrey = styled.div`
  flex: 0.8;
  background: #f9f8f7;
  border-right: 1px solid #eceaea;
`;

const JobsSearchBackgroundWhite = styled.div`flex: 1.25;`;

const JobsSearchRow = styled.div`
  display: flex;
  justify-content: center;
  width: 1080px;
  margin: 0 auto;
`;

const JobsSearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 50px;
  width: ${props => (props.wide ? '100%' : '87%')};
  font-size: 22px;
  font-weight: 800;
`;

const JobsSearchHeaderText = styled.div`
  display: inline-block;
  padding-bottom: 15px;
  border-bottom: 1px solid #212121;
  position: relative;
  top: 1px;
`;

const JobsSearchColumn = styled.div`
  position: relative;
  padding-top: 30px;
  margin-right: ${props => (props.margin ? '120px' : '0px')};
  flex: ${props => (props.wide ? '1.35' : '0.65')};
`;

const JobSearchEmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
`;

const JobSearchEmptyStateHeader = styled.h4`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
`;

const JobSearchEmptyStateShadow = styled.div`
  height: 20px;
  width: 70px;
  border-radius: 7px;
  background: red;
`;

const JobSearchResultsEnd = styled.div`
  padding: 60px 0 80px;
  text-align: center;
`;
