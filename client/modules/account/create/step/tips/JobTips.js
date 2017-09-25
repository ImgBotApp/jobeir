// @flow
import React from 'react';
import styled from 'styled-components';
import {
  BackpackIcon,
  BoxGraphIcon,
  HandsCoinsIcon,
  LightBulbIcon,
  MailIcon
} from '../../../../../icons/';

const JobTips = (step: string) => {
  switch (step) {
    case 'about':
      return (
        <StepTipsContainer>
          <BoxGraphIcon height={40} width={40} />
          <StepTipsHeader>What do applicants look for in a job?</StepTipsHeader>
          <StepTipsText>
            Applicants place great value in professional development,
            compensation, work enviroment, and the technology they will work
            with.
          </StepTipsText>
        </StepTipsContainer>
      );
    case 'type':
      return (
        <StepTipsContainer>
          <BackpackIcon height={40} width={40} />
          <StepTipsHeader>The working enviroment</StepTipsHeader>
          <StepTipsText>
            Everyone works differently. Having flexibilty in the workplace and
            what is expected of employees can increase productivity and the
            appeal of jobs.
          </StepTipsText>
        </StepTipsContainer>
      );
    case 'compensation':
      return (
        <StepTipsContainer>
          <HandsCoinsIcon height={40} width={40} />
          <StepTipsHeader>Compensation</StepTipsHeader>
          <StepTipsText>
            Being honest upfront will save time in the long run.
          </StepTipsText>
          <StepTipsText>
            Offering competitive salaries is a key component to attracting the
            best candidates.
          </StepTipsText>
        </StepTipsContainer>
      );
    case 'contact':
      return (
        <StepTipsContainer>
          <MailIcon height={40} width={40} />
          <StepTipsHeader>Receiving Applications</StepTipsHeader>
          <StepTipsText>
            The emails you provide will receive applications directly.
            Applicants also have the option to contact you directly.
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

export default JobTips;

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
