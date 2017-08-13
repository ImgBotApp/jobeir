// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const JobsListEmptyState = (props: { link: string }) =>
  <JobsListEmptyStateContainer>
    <EmptyStateText>You have not created any job postings yet</EmptyStateText>
    <StyledLink to={props.link}>Create a job</StyledLink>
  </JobsListEmptyStateContainer>;

export default JobsListEmptyState;

const JobsListEmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: none;
  height: 50px;
  width: 100%;
  font-size: 18px;
  color: #fff;
  background: ${props => props.theme.colors.purple};
  max-width: 200px;
  cursor: pointer;
  opacity: 1;
  text-decoration: none;
  text-align: center;
`;

const EmptyStateText = styled.p`
  font-size: 22px;
  margin-bottom: 25px;
`;
