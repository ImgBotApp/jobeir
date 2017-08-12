// @flow
import React from 'react';
import styled from 'styled-components';

const JobSearchPostingLoader = () =>
  <PlaceholderContainer>
    <PlaceholderLogo />
    <PlaceholderTitle />
    <PlaceholderText1 />
    <PlaceholderText2 />
    <PlaceholderText3 />
  </PlaceholderContainer>;

export default JobSearchPostingLoader;

const PlaceholderContainer = styled.div`
  display: block;
  margin-bottom: 50px;
`;

const PlaceholderLogo = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 450px;
  height: 14px;
  margin-bottom: 16px;
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 320px;
  height: 14px;
  margin-bottom: 30px;
`;

const PlaceholderText1 = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 100%;
  height: 14px;
  margin-bottom: 16px;
`;

const PlaceholderText2 = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 80%;
  height: 14px;
  margin-bottom: 16px;
`;

const PlaceholderText3 = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 30%;
  height: 14px;
  margin-bottom: 16px;
`;
