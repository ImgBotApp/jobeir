import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getJobs } from '../../../create/job/ducks/';
import JobsFilter from './JobsFilter';
import JobsHeader from '../components/JobsHeader';
import JobsList from '../components/JobsList';

class Jobs extends Component {
  componentDidMount() {
    const { companies, dispatch } = this.props;
    dispatch(getJobs(companies.activeCompany._id));
  }

  render() {
    const { companies, jobs } = this.props;
    return (
      <div>
        {jobs.postings.length > 0
          ? <div>
              <JobsContainer>
                <JobsFilter />
                <JobsList jobs={jobs.postings} />
              </JobsContainer>
            </div>
          : <Link to={`/create/job/about/${companies.activeCompany._id}`}>
              Create a job
            </Link>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(Jobs);

const JobsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
