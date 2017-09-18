// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import { Glow } from '../../../../../styles/animate';

const JobPostingPreviewPlaceholder = () =>
  <Glow>
    <JobPostingPreviewPlaceholderContainer>
      <JobPostingPreviewPlaceholderRow />
      <JobPostingPreviewPlaceholderRow />
      <JobPostingPreviewPlaceholderRow width="80" />
    </JobPostingPreviewPlaceholderContainer>
  </Glow>;

export default JobPostingPreviewPlaceholder;

const JobPostingPreviewPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;

  ${media.tablet`
    display: none;
  `};
`;

const JobPostingPreviewPlaceholderRow = styled.div`
  height: 14px;
  background: ${props => props.theme.colors.placeholder};
  margin-bottom: 20px;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
`;
