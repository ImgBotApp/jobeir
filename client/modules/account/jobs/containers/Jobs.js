import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';
import JobsFilter from './JobsFilter';
import JobsHeader from '../components/JobsHeader';
import JobsList from '../components/JobsList';

class Jobs extends Component {
  render() {
    return (
      <div>
        {this.props.companies.created.map(company => {
          return (
            <JobsContainer key={company._id}>
              <JobsHeader name={company.displayName} id={company._id} />
              <JobsFilter />
              <JobsList jobs={company.jobs} />
            </JobsContainer>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies
});

export default connect(mapStateToProps)(UserWrapper(Jobs));

const JobsContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;
