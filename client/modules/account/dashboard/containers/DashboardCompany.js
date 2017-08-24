import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';

class DashboardCompany extends Component {
  render() {
    const { company } = this.props;

    if (!company._id) {
      return null;
    }

    return (
      <DashboardCompanyContainer>
        <div
          key={company._id}
          style={{ maxWidth: '250px', marginBottom: '50px' }}
        >
          <h1>
            {company.displayName}
          </h1>
          <div>
            {company.website}
          </div>
          <div>
            {company.phone}
          </div>
          <div>
            {company.locations.map(location =>
              <div key={location._id}>
                <h2>Location</h2>
                <div>
                  {location.street}
                </div>
                <div>
                  {location.city}
                </div>
                <div>
                  {location.province}
                </div>
                <div>
                  {location.postalCode}
                </div>
                <div>
                  {location.country}
                </div>
              </div>
            )}
          </div>
          <h3>
            <Link to={`/create/job/about/${company._id}`}>Post a job</Link>
          </h3>
        </div>
      </DashboardCompanyContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  company: state.companies.created[0],
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(DashboardCompany);

const DashboardCompanyContainer = styled.div``;
