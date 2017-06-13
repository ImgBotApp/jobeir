import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';
import moment from 'moment';

const states = ['All', 'Review', 'Active', 'Paused', 'Deleted'];
class DashboardJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: ['All Jobs', 'Review', 'Active', 'Paused', 'Deleted'],
      activeState: 'All Jobs'
    };
  }
  handleJobClick(id) {
    browserHistory.push(`dashboard/jobs/${id}`);
  }

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
              <DashboardJobsFilter>
                {this.state.states.map(state => {
                  return (
                    <DashboardJobsFilterItem
                      active={state === this.state.activeState}
                    >
                      {state}
                    </DashboardJobsFilterItem>
                  );
                })}
              </DashboardJobsFilter>

              {company.jobs.map(job => {
                console.log(job);
                return (
                  <DashboardJobsBody
                    onClick={() => this.handleJobClick(job._id)}
                  >
                    <DashboardJobsMain>
                      <DashboardJobsTitle>{job.title}</DashboardJobsTitle>
                      <DashboardJobsState>{job.state}</DashboardJobsState>
                    </DashboardJobsMain>
                    <DashboardJobsSub>
                      <div>created {moment(job.dateCreated).fromNow()}</div>
                      <div>{job.city}</div>
                      <DashboardJobsDot>·</DashboardJobsDot>
                      <div>
                        {job.address.city}
                      </div>
                      <DashboardJobsDot>·</DashboardJobsDot>
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
  padding-bottom: 30px;
`;

const DashboardJobsHeading = styled.h1`
  font-size: 42px;
`;

const DashboardJobsFilter = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const DashboardJobsFilterItem = styled.div`
  padding-top: 16px;
  margin-right: 20px;
  color: ${props => (props.active ? '#333' : '#8f8f8f')};
  border-top: 1px solid transparent;
  border-color: ${props => (props.active ? 'rgba(0,0,0,.5)' : 'transparent')};
  font-size: 16px;
`;

const DashboardJobsBody = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;

const DashboardJobsTitle = styled.h3`
  font-size: 22px;
`;

const DashboardJobsState = styled.div`
  font-size: 16px;
`;

const DashboardJobsMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DashboardJobsSub = styled.div`
  display: flex;
  color: #929292;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 200;
`;

const DashboardJobsDot = styled.span`
  display: inline-block;
  padding: 0 5px;
`;
