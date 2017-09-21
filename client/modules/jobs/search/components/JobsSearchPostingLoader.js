// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Glow } from '../../../../styles/animate';

const JobSearchPostingLoader = () => (
  <Glow>
    <PlaceholderContainer>
      <PlaceholderRow>
        <PlaceholderLogo />
        <PlaceholderTitle />
        <PlaceholderText1 />
        <PlaceholderText2 />
        <PlaceholderText3 />
      </PlaceholderRow>
      <PlaceholderRow>
        <PlaceholderLogo />
        <PlaceholderTitle />
        <PlaceholderText1 />
        <PlaceholderText2 />
        <PlaceholderText3 />
      </PlaceholderRow>
    </PlaceholderContainer>
  </Glow>
);

export default JobSearchPostingLoader;

const PlaceholderContainer = styled.div`
  display: block;
  margin-bottom: 400px;
  margin-top: 20px;
`;

const PlaceholderRow = styled.div`
  display: block;
  margin-bottom: 60px;

  ${media.tablet`
    margin-bottom: 44px;
  `};
`;

const PlaceholderLogo = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 450px;
  height: 14px;
  margin-bottom: 14px;

  ${media.tablet`
    width: 90%;
  `};
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 320px;
  height: 14px;
  margin-bottom: 30px;

  ${media.tablet`
    width: 60%;
    margin-bottom: 14px;
  `};
`;

const PlaceholderText1 = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 100%;
  height: 14px;
  margin-bottom: 14px;
`;

const PlaceholderText2 = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 80%;
  height: 14px;
  margin-bottom: 14px;
`;

const PlaceholderText3 = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 30%;
  height: 14px;
  margin-bottom: 14px;
`;
