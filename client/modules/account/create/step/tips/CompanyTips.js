// @flow
import React from 'react';
import styled from 'styled-components';
import {
  EarthPointIcon,
  LightBulbIcon,
  LogoIcon,
  PaperClipIcon
} from '../../../../../icons/';

const CompanyTips = (step: string) => {
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
        </StepTipsContainer>
      );
    case 'upload':
      return (
        <StepTipsContainer>
          <LogoIcon height={40} width={40} />
          <StepTipsHeader>Upload Logo</StepTipsHeader>
          <StepTipsText>
            Your logo will be used on all job postings and within your account
          </StepTipsText>
          <StepTipsText>
            Make sure your logo has a transaprent background, is under 2Mb, and
            is at least 100px by 100px in size. It is important to have a
            non-pixelated logo on all your job postings.
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
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const StepTipsText = styled.p`
  margin-top: 10px;
  line-height: 1.6;
`;
