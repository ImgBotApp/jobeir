import React from 'react';
import styled from 'styled-components';

const CompanyTips = step => {
  switch (step) {
    case 'about':
      return (
        <StepTipsContainer>
          Tip for about section
        </StepTipsContainer>
      );
    case 'contact':
      return (
        <StepTipsContainer>
          Tip for contact section
        </StepTipsContainer>
      );
    case 'location':
      return (
        <StepTipsContainer>
          Tip for location section
        </StepTipsContainer>
      );
    default:
      return (
        <StepTipsContainer>
          Generic Tip
        </StepTipsContainer>
      );
  }
};

export default CompanyTips;

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
