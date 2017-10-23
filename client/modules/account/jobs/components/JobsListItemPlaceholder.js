// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Glow } from '../../../../styles/animate';

const JobsListItemPlaceholder = () => (
  <Glow>
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
    </JobsListItemPlaceholderContainer>
  </Glow>
);

export default JobsListItemPlaceholder;

const JobsListItemPlaceholderContainer = styled.div`margin-top: 40px;`;

const PlaceholderContainer = styled.div`
  max-width: 1052px;
  margin: 0 auto 70px;

  ${media.tablet`
    margin: 0 auto 30px;
  `};
`;

const PlaceholderTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 40%;
  height: 12px;

  ${media.tablet`
    width: 60%:
  `};
`;

const PlaceholderState = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 8%;
  height: 12px;

  ${media.tablet`
    width: 10%:
  `};
`;

const PlaceholderDetails = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 70%;
  height: 12px;
  margin-bottom: 15px;

  ${media.tablet`
    width: 25%:
  `};
`;
