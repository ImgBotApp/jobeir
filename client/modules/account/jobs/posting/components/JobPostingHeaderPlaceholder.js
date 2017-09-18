// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import { Glow } from '../../../../../styles/animate';

const JobPostingHeaderPlaceholder = () =>
  <Glow>
    <PlaceholderHeader>
      <PlaceholderLogo />
      <PlaceholderTitle />
      <PlaceholderLocation />
      <PlaceholderDate />
    </PlaceholderHeader>
  </Glow>;

export default JobPostingHeaderPlaceholder;

const PlaceholderHeader = styled.div`
  margin: 45px 0 40px;
  padding: 0 24px;
`;

const PlaceholderLogo = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 220px;
  height: 15px;
  margin-bottom: 20px;

  ${media.tablet`
    width: 45%
  `};
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 440px;
  height: 15px;
  margin-bottom: 20px;

  ${media.tablet`
    width: 100%
  `};
`;

const PlaceholderLocation = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 280px;
  height: 15px;
  margin-bottom: 20px;

  ${media.tablet`
    width: 75%
  `};
`;

const PlaceholderDate = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 200px;
  height: 15px;

  ${media.tablet`
    width: 60%
  `};
`;
