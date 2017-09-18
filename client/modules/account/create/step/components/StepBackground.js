import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';

const StepBackground = () =>
  <StepBackgroundContainer>
    <StepBackgroundLeft />
    <StepBackgroundRight />
  </StepBackgroundContainer>;

export default StepBackground;

const StepBackgroundContainer = styled.div`
  ${media.tablet`
    display: none;
  `};
`;

const StepBackgroundLeft = styled.div`
  position: fixed;
  background: #fff;
  right: 45%;
  bottom: 0;
  left: 0%;
  top: 0;
  z-index: -1;
`;

const StepBackgroundRight = styled.div`
  position: fixed;
  max-width: 1280px;
  background: #f9f8f7;
  border-left: 1px solid #eceaea;
  right: 0;
  bottom: 0;
  left: 55%;
  top: 0;
  z-index: -1;
  overflow: hidden;

  @media (max-width: 1280px) {
    left: 57%;
  }

  ${media.desktop`
    left: 57.5%;
  `};
`;
