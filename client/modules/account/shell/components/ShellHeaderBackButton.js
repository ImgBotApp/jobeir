import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { ChevronLeft } from '../../../../icons/';

const ShellHeaderBackButton = ({ to, parent, title }) => (
  <ShellHeaderBackButtonContainer>
    <ShellHeaderBackButtonLink to={to}>
      <StyledChevronLeft />
      {' '}
      <ShellHeaderBackButtonLinkText>{parent}</ShellHeaderBackButtonLinkText>
    </ShellHeaderBackButtonLink>
    <ShellHeaderBackButtonTitle>
      {title}
    </ShellHeaderBackButtonTitle>
  </ShellHeaderBackButtonContainer>
);

export default ShellHeaderBackButton;

const ShellHeaderBackButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShellHeaderBackButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  left: -3px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: rgba(0,0,0,0.8);
  align-self: flex-start;
  padding: 3px 6px 2px 3px;
  margin-bottom: 10px;
  border-radius: 3px;
  transition: background 280ms ease;

  &:hover {
    background: rgba(0,0,0,0.08);
  }
`;

const ShellHeaderBackButtonLinkText = styled.span`
  position: relative;
  left: -3px;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  fill: rgba(0,0,0,0.8);
  position: relative;
  top: -1px;
  left: -4px;
`;

const ShellHeaderBackButtonTitle = styled.h1`
  font-size: 30px;
`;
