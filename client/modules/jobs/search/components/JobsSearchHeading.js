// @flow
import React from 'react';
import styled from 'styled-components';

const JobsSearchHeading = (props: { text: string }) =>
  <JobsSearchHeadingContainer>
    <JobsSearchHeadingHeader>
      {props.text}
    </JobsSearchHeadingHeader>
  </JobsSearchHeadingContainer>;

export default JobsSearchHeading;

const JobsSearchHeadingContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #dddee0;
  padding-bottom 20px;
  margin-bottom: 50px;
`;

const JobsSearchHeadingHeader = styled.h2`
  font-weight: 400;
  font-size: 20px;
`;
