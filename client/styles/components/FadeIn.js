// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * <FadeIn />
 * A utility component that wraps the children you would like
 * to animate into frame. Currently is has no configurable animation
 * to keep everything consistent.
 */
export default (props: { children: any }) =>
  <FadeIn>
    {props.children}
  </FadeIn>;

const FadeInAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const FadeIn = styled.div`
  animation: ${FadeInAnimation} 400ms forwards
    cubic-bezier(0.215, 0.61, 0.355, 1);
`;
