// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
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
  max-width: 1052px;
  width: 100%;
  margin: 0 auto 150px;

  ${media.tablet`
    margin-bottom: 80px
  `};

  ${media.phonePlus`
    margin-bottom: 40px
  `};
`;
