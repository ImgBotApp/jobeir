import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';

class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <div>Profile</div>
        <div>
          <Link to="/create/company/about">Create a company</Link>
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            {this.props.companies.created.map(company => {
              return (
                <div
                  key={company._id}
                  style={{ maxWidth: '250px', marginBottom: '50px' }}
                >
                  <h1>{company.displayName}</h1>
                  <div>{company.product}</div>
                  <div>{company.website}</div>
                  <div>{company.phone}</div>
                  <div>
                    {company.locations.map(location => {
                      return (
                        <div key={location._id}>
                          <h2>Location</h2>
                          <div>{location.street}</div>
                          <div>{location.city}</div>
                          <div>{location.province}</div>
                          <div>{location.postalCode}</div>
                          <div>{location.country}</div>
                        </div>
                      );
                    })}
                  </div>
                  <h3>
                    <Link to={`/create/job/about/${company._id}`}>
                      Post a job
                    </Link>
                  </h3>
                </div>
              );
            })}
          </div>
          <div>
            {this.props.jobs.created.map(job => {
              return (
                <div
                  key={job._id}
                  style={{ maxWidth: '250px', marginBottom: '50px' }}
                >
                  <h1>{job.displayName}</h1>
                  <div>{job.product}</div>
                  <div>{job.website}</div>
                  <div>{job.phone}</div>
                  <div>
                    {job.locations &&
                      job.locations.map(location => {
                        return (
                          <div key={location._id}>
                            <h2>Location</h2>
                            <div>{location.street}</div>
                            <div>{location.city}</div>
                            <div>{location.province}</div>
                            <div>{location.postalCode}</div>
                            <div>{location.country}</div>
                          </div>
                        );
                      })}
                  </div>
                  <h3>
                    <Link to={`/create/job/about/${job._id}`}>Post a job</Link>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(UserWrapper(Dashboard));

const DashboardContainer = styled.div`
  max-width: 1280px;
  margin: 50px auto;
`;
