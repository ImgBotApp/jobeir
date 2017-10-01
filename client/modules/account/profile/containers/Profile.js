// @flow
import React from 'react';
import styled from 'styled-components';
import ProfileEditForm from '../../../user-input/forms/form/ProfileEditForm';
import ShellFormSection from '../../shell/components/ShellFormSection';

const Profile = () => (
  <ProfileContainer>
    <ShellFormSection text="Edit your profile info">
      <ProfileEditForm />
    </ShellFormSection>
  </ProfileContainer>
);

export default Profile;

const ProfileContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto 150px;
`;
