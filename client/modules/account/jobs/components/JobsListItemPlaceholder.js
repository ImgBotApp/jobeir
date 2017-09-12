// @flow
import React from 'react';
import styled from 'styled-components';

const JobsListItemPlaceholder = () =>
  <JobsListItemPlaceholderContainer>
    <PlaceholderContainer>
      <PlaceholderTop>
        <PlaceholderTitle />
        <PlaceholderState />
      </PlaceholderTop>
      <PlaceholderDetails />
    </PlaceholderContainer>
    <PlaceholderContainer>
      <PlaceholderTop>
        <PlaceholderTitle />
        <PlaceholderState />
      </PlaceholderTop>
      <PlaceholderDetails />
    </PlaceholderContainer>
  </JobsListItemPlaceholderContainer>;

export default JobsListItemPlaceholder;

const JobsListItemPlaceholderContainer = styled.div`margin-top: 40px;`;

const PlaceholderContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto 70px;
`;

const PlaceholderTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 40%;
  height: 15px;
`;

const PlaceholderState = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 8%;
  height: 15px;
`;

const PlaceholderDetails = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 60%;
  height: 15px;
  margin-bottom: 20px;
`;
