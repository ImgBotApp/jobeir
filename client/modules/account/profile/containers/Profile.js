// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProfileEditForm from '../../../user-input/forms/form/ProfileEditForm';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <ProfileContainer>
        <ProfileHeader>Profile info</ProfileHeader>
        <ProfileSubHeader>Edit your profile info</ProfileSubHeader>
        <ProfileEditForm />
      </ProfileContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(Profile);

const ProfileContainer = styled.div``;

const ProfileHeader = styled.h2`
  font-weight: 600;
  padding: 20px 0 5px;
  font-size: 22px;
  border-top: 1px solid #ececec;
`;

const ProfileSubHeader = styled.h3`
  font-weight: 400;
  font-size: 18px;
  color: #9ea4a8;
  margin-bottom: 50px;
`;

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
