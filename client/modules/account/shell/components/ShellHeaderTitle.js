// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

/**
 * <ShellHeaderTitle />
 * A simple component that will check the headerText and return
 * the appropriate header title depending on it. This component is
 * used like a router for the correct header.
 */
const ShellHeaderTitle = (props: { headerText: string }) => (
  <ShellHeaderTitleContainer>{props.headerText}</ShellHeaderTitleContainer>
);

export default ShellHeaderTitle;

const ShellHeaderTitleContainer = styled.h1`
  font-size: 56px;
  font-weight: 900;

  ${media.desktop`
    font-size: 48px;
  `};

  ${media.tablet`
    font-size: 42px;
  `};

  ${media.phonePlus`
    font-size: 38px;
  `};
`;
