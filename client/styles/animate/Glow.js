// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * <Glow />
 * A utility component that wraps the children you would like
 * to animate into frame.
 */
export default (props: { children: any }) => <Glow>{props.children}</Glow>;

const GlowAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const Glow = styled.div`animation: ${GlowAnimation} 1.25s linear;`;
