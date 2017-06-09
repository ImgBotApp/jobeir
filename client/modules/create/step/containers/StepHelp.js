import React from 'react';
import styled from 'styled-components';
import StepProgress from '../components/StepProgress';
import StepTips from '../components/StepTips';

const StepHelp = props => {
  const { params } = props;

  return (
    <StepHelpContainer>
      <StepProgress params={params} />
      <StepTips params={params} />
    </StepHelpContainer>
  );
};

export default StepHelp;

const StepHelpContainer = styled.div`
  align-self: flex-start;
  width: 33.5%;
  margin-left: 7.5rem;

`;

const StepHelpHeader = styled.div`
  font-weight: 600;
`;
