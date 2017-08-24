// @flow
import React from 'react';
import styled from 'styled-components';
import ShellHeaderTitle from './ShellHeaderTitle';

/**
 * <ShellHeader />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
const ShellHeader = (props: { headerText: string, params: {} }) => {
  const { headerText, params } = props;

  return (
    <ShellHeaderContainer>
      <ShellHeaderTitle headerText={headerText} params={params} />
      <ShellRightSide />
    </ShellHeaderContainer>
  );
};

export default ShellHeader;

const ShellHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 60px 0 40px;
`;

const ShellRightSide = styled.div`
  display: flex;
  align-items: flex-start;
`;
