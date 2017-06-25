import React from 'react';
import styled from 'styled-components';
import ShellHeaderTitle from './ShellHeaderTitle';
import ShellDropdown from '../containers/ShellDropdown';
import ShellHeaderNav from '../containers/ShellHeaderNav';

/**
 * <ShellHeader />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
const ShellHeader = ({ headerText, params }) =>
  <ShellHeaderContainer>
    <ShellHeaderTitle headerText={headerText} params={params} />
    <ShellRightSide>
      <ShellRightContent>
        <ShellHeaderNav />
        <ShellDropdown />
      </ShellRightContent>
    </ShellRightSide>
  </ShellHeaderContainer>;

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

const ShellRightContent = styled.div`
  display: flex;
  align-items: center;
`;
