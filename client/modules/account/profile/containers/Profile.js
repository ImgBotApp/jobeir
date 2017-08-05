// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <ProfileContainer>
        <ProfileName>
          {user.firstName} {user.lastName}
        </ProfileName>
        <div>
          {user.phone}
        </div>
        <div>
          {user.companies.map(company =>
            <ProfileCompany>
              <ProfileCompanyName>
                {company.displayName}
              </ProfileCompanyName>
              <ProfileCompanyJobs>
                {company.jobs.length} postings
              </ProfileCompanyJobs>
            </ProfileCompany>
          )}
        </div>
      </ProfileContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(Profile);

const ProfileContainer = styled.div`margin-top: 50px;`;

const ProfileName = styled.h3`
  font-size: 28px;
  margin-bottom: 50px;
`;

const ProfileCompany = styled.div`margin-bottom: 40px;`;

const ProfileCompanyLogo = styled.img`
  width: 50px;
  margin-right: 25px;
`;

const ProfileCompanyName = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 3px;
`;

const ProfileCompanyJobs = styled.p`font-size: 16px;`;
