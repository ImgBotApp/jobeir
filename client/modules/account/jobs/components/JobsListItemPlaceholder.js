// @flow
import React from 'react';
import styled from 'styled-components';

const JobsListItemPlaceholder = () =>
  <div>
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
  </div>;

export default JobsListItemPlaceholder;

const PlaceholderContainer = styled.div`margin-bottom: 70px;`;

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
