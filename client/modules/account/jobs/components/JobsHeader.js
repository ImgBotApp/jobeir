import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const JobsHeader = ({ name, id }) => {
  return (
    <JobsHeaderContainer>
      <JobsHeading>
        {name} Jobs
      </JobsHeading>
      <Link to={`/create/job/about/${id}`}>
        Create job
      </Link>
    </JobsHeaderContainer>
  );
};

export default JobsHeader;

const JobsHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 30px;
`;

const JobsHeading = styled.h1`
  font-size: 42px;
`;
