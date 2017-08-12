// @flow
import React from 'react';
import styled from 'styled-components';

const JobsPostingHeaderPlaceholder = () =>
  <PlaceholderHeader>
    <PlaceholderLogo />
    <PlaceholderTitle />
    <PlaceholderLocation />
    <PlaceholderDate />
  </PlaceholderHeader>;

export default JobsPostingHeaderPlaceholder;

const PlaceholderHeader = styled.div`
  display: inline-block;
  margin: 45px 0 40px;
`;

const PlaceholderLogo = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 220px;
  height: 15px;
  margin-bottom: 20px;
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 440px;
  height: 15px;
  margin-bottom: 20px;
`;

const PlaceholderLocation = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 280px;
  height: 15px;
  margin-bottom: 20px;
`;

const PlaceholderDate = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 200px;
  height: 15px;
`;
