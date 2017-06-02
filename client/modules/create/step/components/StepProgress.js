import React from 'react';
import styled from 'styled-components';

const createJob = ['about', 'type', 'compensation', 'contact'];
const createCompany = ['about', 'contact', 'location', 'upload'];

const getFormStepDetails = params => {
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
      return 0;
  }
};

const StepProgress = props => {
  const formStep = getFormStepDetails(props.params);

  return (
    <StepProgressContainer>
      <StepProgressNodeContainer>
        {formStep.steps.map((node, index) => {
          return (
            <StepProgressNode
              key={node}
              fillCircle={index <= formStep.index}
              fillLine={index < formStep.index}
            />
          );
        })}
      </StepProgressNodeContainer>
    </StepProgressContainer>
  );
};

export default StepProgress;

const StepProgressContainer = styled.div`
`;

const StepProgressNodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5f4f4;
  padding-bottom: 18px;
  margin-bottom: 18px;
  overflow: hidden;
`;

const StepProgressNode = styled.div`
  background: ${props => (props.fillCircle ? props.theme.colors.blue : '#e1e1e1')};
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
    background: ${props => (props.fillLine ? props.theme.colors.blue : '#e1e1e1')};
    z-index: 0;
  }

  &:last-child {
    
    &::before {
      display: none;
    }
  }
`;
