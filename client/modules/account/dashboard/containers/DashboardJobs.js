import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';
import moment from 'moment';

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
              </DashboardJobsHeader>

              {company.jobs.map(job => {
                console.log(job);
                return (
                  <DashboardJobsBody>
                    <DashboardJobsMain>
                      <DashboardJobsTitle>{job.title}</DashboardJobsTitle>
                    </DashboardJobsMain>
                    <DashboardJobsSub>
                      <div>created {moment(job.dateCreated).fromNow()}</div>
                      <div>{job.city}</div>
                      <div>
                        {job.salaryMin / 1000}K - {job.salaryMax / 1000}K
                      </div>
                    </DashboardJobsSub>
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
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 30px;
  padding-bottom: 30px;
`;

const DashboardJobsHeading = styled.h1`
  font-size: 42px;
`;

const DashboardJobsBody = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;

  &:last-child {
    border: none;
  }
`;

const DashboardJobsTitle = styled.h3`
  font-size: 22px;
`;

const DashboardJobsMain = styled.div`
`;

const DashboardJobsSub = styled.div`
  color: #929292;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 200;
`;
