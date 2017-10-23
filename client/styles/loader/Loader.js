import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 10px 0 -5px;
  }
  40% {
    box-shadow: 0 10px 0 0;
  }
`;

const Loader = styled.div`
  position: relative;
  bottom: 10px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation-fill-mode: both;
  animation: ${LoaderAnimation} 1.4s infinite ease-in-out;
  color: #ffffff;
  font-size: 10px;
  margin: 0 auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &::before,
  &::after {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation-fill-mode: both;
    animation: ${LoaderAnimation} 1.4s infinite ease-in-out;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
  }

  &::before {
    left: -2.25em;
    animation-delay: -0.32s;
  }

  &::after {
    left: 2.25em;
  }
`;

export default Loader;
