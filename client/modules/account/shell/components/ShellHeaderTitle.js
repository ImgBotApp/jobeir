import React from 'react';
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
      return <div>{headerText}</div>;
  }
};

export default ShellHeaderTitle;
