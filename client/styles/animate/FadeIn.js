// @flow
import React from 'react';
import styled from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * <FadeIn />
 * A utility component that wraps the children you would like
 * to animate into frame. Currently is has no configurable animation
 * to keep everything consistent.
 */
export default (props: { children: any }) =>
  <FadeIn>
    <ReactCSSTransitionGroup
      transitionName="fadein"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      {props.children}
    </ReactCSSTransitionGroup>
  </FadeIn>;

const FadeIn = styled.div`
  .fadein-appear {
    opacity: 0.01;
  }

  .fadein-appear.fadein-appear-active {
    opacity: 1;
    transition: opacity .280s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;
