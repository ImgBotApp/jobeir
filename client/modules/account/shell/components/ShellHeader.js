// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
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
    </ShellHeaderContainer>
  );
};

export default ShellHeader;

const ShellHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 70px 0 40px;
  max-width: 1052px;
  margin: 0 auto;

  ${media.tablet`
    padding: 50px 0 25px;
  `};

  ${media.phonePlus`
    padding: 40px 0 20px;
  `};
`;
