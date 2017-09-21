// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const handleBackToTopClick = () => {
  document.body.scrollTop = 0;
};

const JobsSearchNoMoreResults = () => (
  <JobsSearchNoMoreResultsContainer>
    <JobsSearchNoMoreResultsTop>
      No more search results
    </JobsSearchNoMoreResultsTop>
    {window.pageYOffset > 1000 && (
      <JobsSearchNoMoreResultsBack onClick={handleBackToTopClick}>
        Back to top
      </JobsSearchNoMoreResultsBack>
    )}
  </JobsSearchNoMoreResultsContainer>
);

export default JobsSearchNoMoreResults;

const JobsSearchNoMoreResultsContainer = styled.div`
  padding: 60px 0 80px;
  text-align: center;

  ${media.tablet`
    padding: 30px 0 50px;
    margin-bottom: 40px;
  `};
`;

const JobsSearchNoMoreResultsTop = styled.div`margin-bottom: 15px;`;

const JobsSearchNoMoreResultsBack = styled.div`cursor: pointer;`;
