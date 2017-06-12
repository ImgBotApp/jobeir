import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';

class DashboardJobs extends Component {
  render() {
    return (
      <div>
        {this.props.companies.created.map(company => {
          return (
            <DashboardJobsContainer>
              <DashboardJobsHeader>
                <DashboardJobsHeading>
                  {company.displayName} Jobs
                </DashboardJobsHeading>
                <DashboardJobsCreate to={`/create/job/about/${company._id}`}>
                  Create job
                </DashboardJobsCreate>
              </DashboardJobsHeader>

              {company.jobs.map(job => {
                return (
                  <DashboardJobsBody>
                    <p>{job.title}</p>
                    <p>{job.dateCreated}</p>
                  </DashboardJobsBody>
                );
              })}
            </DashboardJobsContainer>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(UserWrapper(DashboardJobs));

const DashboardJobsContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const DashboardJobsHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,.15);
  margin-bttom: 25px;
  padding-bottom: 20px;
`;

const DashboardJobsHeading = styled.h1`
  font-size: 24px;
`;

const DashboardJobsBody = styled.p`
`;

const DashboardJobsCreate = styled(Link)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.red};
  font-size: 14px;
`;
