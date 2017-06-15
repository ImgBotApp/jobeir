import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import JobsFilter from './JobsFilter';
import JobsHeader from '../components/JobsHeader';
import JobsList from '../components/JobsList';

class Jobs extends Component {
  render() {
    const { companies, jobs } = this.props;
    return (
      <div>
        {jobs.created.length > 0
          ? <div>
              {jobs.map(company => {
                return (
                  <JobsContainer key={company._id}>
                    <JobsFilter />
                    <JobsList jobs={company.jobs} />
                  </JobsContainer>
                );
              })}
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
