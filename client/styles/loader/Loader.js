import React from 'react';
import styled, { keyframes } from 'styled-components';

const loaderAnimation = keyframes`
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  pointer-events: none;
  position: relative;
  top: -20px;
`;

const LoaderDot = styled.span`
  animation: ${loaderAnimation} 1.2s infinite;
  animation-fill-mode: both;
  color: #fff;
  font-size: 66px;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loader = () => (
  <LoaderContainer>
    <LoaderDot>.</LoaderDot>
    <LoaderDot>.</LoaderDot>
    <LoaderDot>.</LoaderDot>
  </LoaderContainer>
);

export default Loader;
