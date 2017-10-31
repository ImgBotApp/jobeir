// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { browserHistory, Link } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import throttle from 'lodash/throttle';
import { serverGetJobs } from '../server/';
import {
  shouldGetJobs,
  searchJobs,
  resetJobs,
  filterSearchJobs
} from '../ducks/';
import { showModal } from '../../../modal/ducks';
import AppHead from '../../../app/components/AppHead';
import JobsSearchSidebar from './JobsSearchSidebar';
import JobsSearchFilterMobile from './JobsSearchFilterMobile';
import JobsSearchPosting from '../components/JobsSearchPosting';
import JobsSearchFilterButton from '../components/JobsSearchFilterButton';
import JobsSearchFilterReset from '../components/JobsSearchFilterReset';
import JobsSearchNoMoreResults from '../components/JobsSearchNoMoreResults';
import JobsSearchPostingLoader from '../components/JobsSearchPostingLoader';
import { FadeIn } from '../../../../styles/animate';
import { SearchIcon } from '../../../../icons';

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
    initialValues: {},
    screenWidth: number
  };

  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.search);
    const initialValues = {
      location: parsed.l,
      title: {
        title: parsed.q,
        value: parsed.q
      },
      lat: parsed.lat,
      lng: parsed.lng,
      employmentType: parsed.et,
      equity: parsed.eq,
      distance: parsed.d,
      remote: parsed.r,
      companySize: parsed.cs
    };

    this.state = { hasMore: true, initialValues, screenWidth: 1200 };
  }

  componentDidMount() {
    /**
     * One of the few components that we manually want to set to the top of
     * the page because there's a search bar at the bottom of the home page.
     */
    window.scrollTo(0, 0);
    const { dispatch, jobs: { isLoaded }, query } = this.props;
    const queryData = queryString.stringify(query);

    // Only load jobs on mount if the jobs haven't been rendered
    if (!isLoaded) {
      dispatch(searchJobs(queryData));
    }

    this.calculateScreenWidth();

    window.addEventListener(
      'resize',
      throttle(this.calculateScreenWidth, 300),
      true
    );
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
    window.removeEventListener(
      'resize',
      throttle(this.calculateScreenWidth, 300),
      true
    );
  }

  calculateScreenWidth = () => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    this.setState({ screenWidth });
  };

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

  handleCreateJobClick = () => {
    const { activeCompany: { _id }, dispatch, pathname } = this.props;

    // go into the flow if they're logged in with a company
    if (_id) {
      browserHistory.replace(`/create/job/about/${_id}`);
    }

    // otherwise, show the registration modal
    browserHistory.replace(`${pathname}?next=/create/job/about/`);
    dispatch(showModal('AUTH_MODAL', { dispatch }));
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
          {postings.map(posting => (
            <JobsSearchPosting key={posting._id} posting={posting} />
          ))}
          {!hasMore && !isFetching && <JobsSearchNoMoreResults />}
        </FadeIn>
      );
    }

    return isFetching ? (
      <div />
    ) : (
      <JobSearchEmptyState>
        <StyledSearchIcon />
        <JobSearchEmptyStateHeader>
          We couldn't find any job posts
        </JobSearchEmptyStateHeader>
        <JobSearchEmptyStateHeader lessMargin>
          Be the first to{' '}
          <LinkToCreate onClick={this.handleCreateJobClick}>
            create one
          </LinkToCreate>
        </JobSearchEmptyStateHeader>
      </JobSearchEmptyState>
    );
  }

  render() {
    const { initialValues, screenWidth } = this.state;

    return (
      <JobsSearchContainer>
        <AppHead title="Job Search Results" />
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
            {screenWidth > 768 && (
              <JobsSearchSidebar initialValues={initialValues} />
            )}
          </JobsSearchColumn>
          <JobsSearchColumn wide>
            <JobsSearchHeader wide>
              <JobsSearchHeaderText>
                Search results ({this.props.jobs.count})
              </JobsSearchHeaderText>
            </JobsSearchHeader>
            <InfiniteScroll
              loadMore={this.loadMoreJobs}
              hasMore={this.state.hasMore}
              loader={<JobsSearchPostingLoader />}
            >
              {this.buildJobPostings()}
            </InfiniteScroll>
          </JobsSearchColumn>
        </JobsSearchRow>
        <JobsSearchFilterButton />
        {screenWidth <= 768 && (
          <JobsSearchFilterMobile initialValues={initialValues} />
        )}
      </JobsSearchContainer>
    );
  }
}

const mapStateToProps = state => ({
  activeCompany: state.account.companies.activeCompany,
  pathname:
    (state.routing.locationBeforeTransitions &&
      state.routing.locationBeforeTransitions.pathname) ||
    '',
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

  ${media.tablet`
    padding-top: 0px;
  `};
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

  ${media.tablet`
    display: none;
  `};
`;

const JobsSearchBackgroundGrey = styled.div`
  flex: 0.77;
  background: #f9f8f7;
  border-right: 1px solid #eceaea;

  ${media.retina`
    flex: 0.725;
  `};

  ${media.hd`
    flex: 0.62;
  `};
`;

const JobsSearchBackgroundWhite = styled.div`flex: 1.25;`;

const JobsSearchRow = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;

const JobsSearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 50px;
  width: ${props => (props.wide ? '100%' : '87%')};
  font-size: 22px;
  font-weight: 800;

  ${media.tablet`
    font-size: 20px;
    margin-bottom: 30px;
  `};
`;

const JobsSearchHeaderText = styled.h2`
  display: inline-block;
  padding-bottom: 15px;
  border-bottom: 1px solid #212121;
  position: relative;
  top: 1px;
  font-size: 20px;

  ${media.phablet`padding-bottom: 8px`};
`;

const JobsSearchColumn = styled.div`
  position: relative;
  padding-top: 30px;
  margin-right: ${props => (props.margin ? '120px' : '0px')};
  flex: ${props => (props.wide ? '1.35' : '0.65')};

  ${media.hd`
    margin-right: ${props => (props.margin ? '70px' : '0px')};
  `};

  ${media.desktop`
    margin-right: ${props => (props.margin ? '60px' : '0px')};
  `};

  ${media.tablet`
    padding-top: 30px;
    width: ${props => (props.wide ? '100%' : 'auto')};
  `};

  ${props =>
    props.margin
      ? media.tablet`
      display: none;
  `
      : ''};
`;

const JobSearchEmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
`;

const JobSearchEmptyStateHeader = styled.h4`
  margin-top: ${props => (props.lessMargin ? '10px' : '20px')};
  font-size: 18px;
  font-weight: 400;

  ${media.phablet`
    margin-top: 10px;
    font-size: 16px;
  `};

  ${media.phone`
    font-size: 14px;
  `};
`;

const StyledSearchIcon = styled(SearchIcon)`
  height: 50px;
  width: 50px;

  ${media.phablet`
    height: 40px;
    width: 40px;
  `};
`;

const LinkToCreate = styled.button`
  color: ${props => props.theme.colors.purple};
  background: transparent;
  cursor: pointer;
  text-decoration: underline;
  border: none;
  font-size: 16px;
`;
