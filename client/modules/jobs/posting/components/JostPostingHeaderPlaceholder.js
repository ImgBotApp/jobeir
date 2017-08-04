// @flow
import React from 'react';
import styled from 'styled-components';

const JobsPostingHeadePlaceholder = () =>
  <PlaceholderHeader>
    <PlaceholderLogo />
    <PlaceholderTitle />
    <PlaceholderLocation />
    <PlaceholderDate />
  </PlaceholderHeader>;

export default JobsPostingHeadePlaceholder;

const PlaceholderHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PlaceholderLogo = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 200px;
  height: 15px;
  margin: 25px 0 40px;
`;

const PlaceholderTitle = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 460px;
  height: 15px;
  margin: 5px 0 30px;
`;

const PlaceholderLocation = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 240px;
  height: 15px;
  margin-bottom: 25px;
`;

const PlaceholderDate = styled.div`
  background: ${props => props.theme.colors.placeholder};
  width: 200px;
  height: 15px;
`;
