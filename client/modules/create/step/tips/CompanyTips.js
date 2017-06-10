import React from 'react';
import styled from 'styled-components';
import { EarthPointIcon, LightBulbIcon } from '../../../../icons/';

const CompanyTips = step => {
  switch (step) {
    case 'about':
      return (
        <StepTipsContainer>
          <LightBulbIcon height={40} width={40} />
          <StepTipsHeader>
            Your mission
          </StepTipsHeader>
          <StepTipsText>
            Every company is unique and faces exciting challenges. Let applicants know what your company mission is and what you're trying to solve.
          </StepTipsText>
          <StepTipsText />
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
          <EarthPointIcon height={40} width={40} />
          <StepTipsHeader>
            Adding Location
          </StepTipsHeader>
          <StepTipsText>
            The address you enter will be used when creating job postings. If you have multiple locations you can enter them later.
          </StepTipsText>
          <StepTipsText>
            Location is very important when applicants are searching for jobs, so be as accurate as possible.
          </StepTipsText>
          <StepTipsText />
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
`;

const StepTipsHeader = styled.h4`
  margin-top: 10px;
  font-weight: 600;
  font-size: 1.2rem;
`;

const StepTipsText = styled.p`
  margin-top: 10px;
`;
