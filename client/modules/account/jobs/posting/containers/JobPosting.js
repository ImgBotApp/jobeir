// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import JobPostingHeaderPlaceholder from '../components/JobPostingHeaderPlaceholder';
import JobPostingPreviewPlaceholder from '../components/JobPostingPreviewPlaceholder';
import JobPostingHeader from '../components/JobPostingHeader';
import JobPostingBody from './JobPostingBody';
import JobPostingMap from './JobPostingMap';
import { FadeIn } from '../../../../../styles/animate/';

/**
 * <JobPosting />
 * Provides the UI for previewing the posting within the Admin or
 * toggling to edit the posting.
 */
const JobPosting = (props: { activePosting: {}, hideLogo: boolean }) => {
  const { activePosting, hideLogo } = props;
  const activePostingReady: boolean =
    activePosting.company && Object.keys(activePosting.company).length > 0;

  return (
    <JobPostingContainer>
      {activePostingReady ? (
        <FadeIn>
          <JobPostingHeader activePosting={activePosting} hideLogo={hideLogo} />
          <JobPostingBody activePosting={activePosting} />
          <JobPostingMap activePosting={activePosting} />
        </FadeIn>
      ) : (
        <JobPostingPlaceholderContainer>
          <JobPostingHeaderPlaceholder />
          <JobPostingPreviewPlaceholder />
        </JobPostingPlaceholderContainer>
      )}
    </JobPostingContainer>
  );
};

export default JobPosting;

const JobPostingPlaceholderContainer = styled.div`
  max-width: 724px;
  margin: 0 auto;
`;

const JobPostingContainer = styled.div`
  margin-top: 50px;

  ${media.phablet`
    margin-top: 25px;
  `};
`;
