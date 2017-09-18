// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import StepProgress from '../components/StepProgress';
import StepTips from '../components/StepTips';

const StepHelp = (props: { params: {} }) => {
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
  width: 35.5%;
  margin-left: 7.5rem;

  ${media.desktop`
    margin-left: 6.5rem;
  `};

  ${media.tablet`
    display: none;
  `};
`;
