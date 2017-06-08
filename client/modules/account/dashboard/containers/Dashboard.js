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

        {this.props.user.companies.created.map(company => {
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
                <Link to={`/create/job/about/${company._id}`}>Post a job</Link>
              </h3>
            </div>
          );
        })}
      </DashboardContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect()(UserWrapper(Dashboard));

const DashboardContainer = styled.div`
  max-width: 1280px;
  margin: 50px auto;
`;
