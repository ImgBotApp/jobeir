// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';

// The steps required (in order) for each creation option
const createJob = ['about', 'type', 'compensation', 'contact'];
const createCompany = ['about', 'contact', 'location', 'upload'];

/**
 * getFormStep()
 * Based off the step param from react router we keep track of how
 * far the user has gotten through the application.
 */
const getFormStep = (params: { create: string, step: string }) => {
  switch (params.create) {
    case 'job':
      return {
        length: createJob.length,
        index: createJob.indexOf(params.step)
      };
    case 'company':
      return {
        length: createCompany.length,
        index: createCompany.indexOf(params.step)
      };
    default:
      throw new Error(
        'Make sure the params are named property for getFormStepDetails() '
      );
  }
};

const StepProgressBar = (props: { params: {} }) => {
  const formStep: { index: number, length: number } = getFormStep(props.params);
  const width: number = (formStep.index + 1) / formStep.length * 100;

  return (
    <StepProgressBarContainer>
      <StepProgressBarProgress width={width} />
    </StepProgressBarContainer>
  );
};

export default StepProgressBar;

const StepProgressBarContainer = styled.div`
  display: none;

  ${media.tablet`
    position: absolute;
    display: block;
    width: 100%;
    height: 4px;
    background: #f9f8f7;
  `};
`;

const StepProgressBarProgress = styled.div`
  width: ${props => props.width}%;
  height: 4px;
  background: ${props => props.theme.colors.purple};
  transition: width 280ms cubic-bezier(0.39, 0.575, 0.565, 1);
`;
