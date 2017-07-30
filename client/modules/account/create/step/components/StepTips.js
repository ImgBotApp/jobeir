// @flow
import React from 'react';
import styled from 'styled-components';
import * as Tips from '../tips/';

const StepTips = (props: { params: { create: string, step: string } }) => {
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
  border: 1px solid #eceaea;
  padding: 30px;
  margin-top: 18px;
  background: #fff;
`;
