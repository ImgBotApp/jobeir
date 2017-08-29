// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { ChevronLeft } from '../../../../../icons/';

const JobPostingBackButton = () =>
  <JobPostingBackButtonLink to="/account/jobs">
    <StyledChevronLeft />{' '}
    <JobPostingBackButtonLinkText>Jobs</JobPostingBackButtonLinkText>
  </JobPostingBackButtonLink>;

export default JobPostingBackButton;

const JobPostingBackButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  left: -3px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: rgba(0,0,0,0.85);
  align-self: flex-start;
  padding: 3px 6px 2px 3px;
  border-radius: 3px;
  transition: background 280ms ease;

  &:hover {
    background: rgba(0,0,0,0.08);
  }
`;

const JobPostingBackButtonLinkText = styled.span`
  position: relative;
  left: -3px;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  fill: rgba(0,0,0,0.85);
  position: relative;
  top: -1px;
  left: -4px;
`;

const JobPostingBackButtonTitle = styled.h1`font-size: 30px;`;
