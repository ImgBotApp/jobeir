import React from 'react';
import styled from 'styled-components';
import * as Tips from '../tips/';

const StepTips = props => {
  const { params } = props;

  return (
    <StepTipsContainer>
      <StepTipsHeader>Application Tips</StepTipsHeader>
      {Tips[params.create](params.step)}
    </StepTipsContainer>
  );
};

export default StepTips;

const StepTipsContainer = styled.div`
  border-radius: 3px;
  border: 1px solid #eceaea;
  padding: 18px;
  margin-top: 18px;
  background: #fff;
`;

const StepTipsHeader = styled.div`
  font-weight: 600;
`;
