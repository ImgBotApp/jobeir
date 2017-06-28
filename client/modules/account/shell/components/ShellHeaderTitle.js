import React from 'react';
import styled from 'styled-components';
import ShellHeaderTitleJob from './ShellHeaderTitleJob';

/**
 * <ShellHeaderTitle />
 * A simple component that will check the headerText and return
 * the appropriate header title depending on it. This component is
 * used like a router for the correct header.
 */
const ShellHeaderTitle = ({ headerText, params }) => {
  switch (headerText) {
    case 'Job':
      return <ShellHeaderTitleJob params={params} />;
    default:
      return (
        <ShellHeaderTitleContainer>{headerText}</ShellHeaderTitleContainer>
      );
  }
};

export default ShellHeaderTitle;

const ShellHeaderTitleContainer = styled.h1`
  font-size: 52px;
  font-weight: 900;
`;
