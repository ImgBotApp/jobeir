import React, { Component } from 'react';
import styled from 'styled-components';
import ShellHeaderTitle from '../components/ShellHeaderTitle';
import ShellDropdown from '../components/ShellDropdown';
import ShellHeaderNav from './ShellHeaderNav';

/**
 * <ShellHeader />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
const ShellHeader = ({ headerText, params }) => (
  <ShellHeaderContainer>
    <ShellHeaderTitle headerText={headerText} params={params} />
    <ShellRightSide>
      <ShellHeaderNav />
      <ShellDropdown />
    </ShellRightSide>
  </ShellHeaderContainer>
);

export default ShellHeader;

const ShellHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
`;

const ShellHeaderHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;

const ShellRightSide = styled.div`
  display: flex;
  align-items: flex-start;
`;
