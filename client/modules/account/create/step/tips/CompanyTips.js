import React from 'react';
import styled from 'styled-components';
import {
  EarthPointIcon,
  LightBulbIcon,
  PaperClipIcon
} from '../../../../../icons/';

const CompanyTips = step => {
  switch (step) {
    case 'about':
      return (
        <StepTipsContainer>
          <LightBulbIcon height={40} width={40} />
          <StepTipsHeader>Your mission</StepTipsHeader>
          <StepTipsText>
            Every company is unique and faces exciting challenges. Let
            applicants know what your company mission is and what you're trying
            to solve.
          </StepTipsText>
        </StepTipsContainer>
      );
    case 'contact':
      return (
        <StepTipsContainer>
          <PaperClipIcon height={40} width={40} />
          <StepTipsHeader>Contact</StepTipsHeader>
          <StepTipsText>
            The contact information provided here will be availalble to
            applicants applying for jobs.
          </StepTipsText>
          <StepTipsText>
            Make sure these are safe to be publicly shared and checked
            frequently.
          </StepTipsText>
        </StepTipsContainer>
      );
    case 'location':
      return (
        <StepTipsContainer>
          <EarthPointIcon height={40} width={40} />
          <StepTipsHeader>Location</StepTipsHeader>
          <StepTipsText>
            The address you enter will be used when creating job postings. If
            you have multiple locations you can enter them later.
          </StepTipsText>
          <StepTipsText>
            Job location is very important when applicants are searching for
            jobs, so be as accurate as possible.
          </StepTipsText>
        </StepTipsContainer>
      );
    default:
      return (
        <StepTipsContainer>
          <LightBulbIcon height={40} width={40} />
          <StepTipsHeader>You're in good company.</StepTipsHeader>
          <StepTipsText>
            Job postings on -name- are amongst the highest quality in the world.
          </StepTipsText>
        </StepTipsContainer>
      );
  }
};

export default CompanyTips;

const StepTipsContainer = styled.div``;

const StepTipsHeader = styled.h4`
  margin-top: 10px;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const StepTipsText = styled.p`
  margin-top: 10px;
  line-height: 1.6;
`;
