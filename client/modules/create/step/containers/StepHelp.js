import React from 'react';
import styled from 'styled-components';
import StepProgress from '../components/StepProgress';

const StepHelp = props => {
  const { params } = props;

  return (
    <StepHelpContainer>
      <StepProgress params={params} />
      <StepHelpHeader>
        Create a {params.create}
      </StepHelpHeader>
    </StepHelpContainer>
  );
};

export default StepHelp;

const StepHelpContainer = styled.div`
  align-self: flex-start;
  width: 33.5%;
  margin-left: 7.5rem;
  border-radius: 3px;
  border: 1px solid #f5f4f4;
  padding: 18px;
  background: #fff;
`;

const StepHelpHeader = styled.div`
  font-weight: 600;
`;
