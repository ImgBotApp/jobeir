import React from 'react';
import styled from 'styled-components';
import * as Tips from '../tips/';

const StepTips = props => {
  const { params } = props;

  return (
    <StepTipsContainer>
      {Tips[params.create](params.step)}
    </StepTipsContainer>
  );
};

export default StepTips;

const StepTipsContainer = styled.div`
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15);
  padding: 30px;
  margin-top: 18px;
  background: #fff;
`;
