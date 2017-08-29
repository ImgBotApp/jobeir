// @flow
import React from 'react';
import styled from 'styled-components';
import JobPostingBody from '../containers/JobPostingBody';
import JobPostingMap from '../containers/JobPostingMap';
import JobPostingPreviewPlaceholder from './JobPostingPreviewPlaceholder';
import FadeIn from '../../../../../styles/components/FadeIn';

const JobPostingPreview = (props: { activePosting: {} }) => {
  const { activePosting } = props;
  const activePostingReady: boolean = Object.keys(activePosting).length > 0;

  return (
    <JobPostingPreviewContainer>
      {activePostingReady
        ? <div>
            <FadeIn>
              <JobPostingBody activePosting={activePosting} />
            </FadeIn>
            <JobPostingMap activePosting={activePosting} />
          </div>
        : <JobPostingPreviewPlaceholder />}
    </JobPostingPreviewContainer>
  );
};

export default JobPostingPreview;

const JobPostingPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;
