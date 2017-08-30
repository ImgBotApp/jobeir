// @flow
import React from 'react';
import styled from 'styled-components';
import JobPostingBackButton from './JobPostingBackButton';
import JobPostingOptionsButton from './JobPostingOptionsButton';
import { ChevronDown } from '../../../../../icons/';

const JobPostingToggleControls = (props: {
  handleEditClick: Function,
  handleDeleteClick: Function
}) => {
  const { handleEditClick, handleDeleteClick } = props;

  return (
    <JobPostingToggleControlsContainer>
      <JobPostingToggleControlsInlineBlock>
        <JobPostingToggleFlex>
          <JobPostingBackButton />
          <JobPostingToggleFlex>
            <PlainButton onClick={handleEditClick}>Edit</PlainButton>
            <JobPostingOptionsButton />
          </JobPostingToggleFlex>
        </JobPostingToggleFlex>
      </JobPostingToggleControlsInlineBlock>
    </JobPostingToggleControlsContainer>
  );
};

export default JobPostingToggleControls;

const JobPostingToggleControlsContainer = styled.div`
  width: 670px;
  margin: 80px auto 0;
`;

const JobPostingToggleControlsInlineBlock = styled.div`
  display: inline-block;
  width: 100%;
`;

const JobPostingToggleFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlainButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 40px;
  font-weight: 600;
  cursor: pointer;
`;
