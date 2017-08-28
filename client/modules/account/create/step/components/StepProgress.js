// @flow
import React from 'react';
import styled from 'styled-components';

// The steps required (in order) for each creation option
const createJob = ['about', 'type', 'compensation', 'contact'];
const createCompany = ['about', 'contact', 'location', 'upload'];

/**
 * getFormStepDetails()
 * Based off the step param from react router we keep track of how
 * far the user has gotten through the application. This is required to
 * build the step progress indicator.
 */
const getFormStepDetails = (params: { create: string, step: string }) => {
  switch (params.create) {
    case 'job':
      return {
        steps: createJob,
        index: createJob.indexOf(params.step)
      };
    case 'company':
      return {
        steps: createCompany,
        index: createCompany.indexOf(params.step)
      };
    default:
      throw new Error(
        'Make sure the params are named property for getFormStepDetails() '
      );
  }
};

const StepProgress = (props: { params: {} }) => {
  const formStep: { steps: Array<string>, index: number } = getFormStepDetails(
    props.params
  );

  return (
    <StepProgressContainer>
      <StepProgressNodeContainer>
        {formStep.steps.map((node, index) =>
          <StepProgressNode
            key={node}
            fillCircle={index <= formStep.index}
            fillLine={index < formStep.index}
          />
        )}
      </StepProgressNodeContainer>
    </StepProgressContainer>
  );
};

export default StepProgress;

const StepProgressContainer = styled.div`
  border-radius: 3px;
  border: 1px solid #eceaea;
  padding: 18px;
  background: #fff;
`;

const StepProgressNodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3px;
  overflow: hidden;
`;

const StepProgressNode = styled.div`
  background: ${props =>
    props.fillCircle ? props.theme.colors.purple : '#e1e1e1'};
  border-radius: 50%;
  height: 14px;
  width: 14px;

  &::before {
    content: '';
    position: relative;
    top: 7px;
    left: 14px;
    height: 1px;
    width: 300px;
    display: block;
    background: ${props =>
      props.fillLine ? props.theme.colors.purple : '#e1e1e1'};
    z-index: 0;
  }

  &:last-child {
    &::before {
      display: none;
    }
  }
`;
