// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const ShellFormSection = ({ children, text }) => (
  <ShellFormSectionRow>
    <ShellFormSectionColumn>
      <ShellFormSectionSubHeader>{text}</ShellFormSectionSubHeader>
    </ShellFormSectionColumn>
    <ShellFormSectionColumn wide>{children}</ShellFormSectionColumn>
  </ShellFormSectionRow>
);

export default ShellFormSection;

const ShellFormSectionSubHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.grey.mid};

  ${media.desktop`
    font-size: 16px;
  `};
`;

const ShellFormSectionRow = styled.div`
  display: flex;
  padding: 40px 0 20px;
  margin-bottom: 25px;
  border-top: 1px solid #eceaea;

  ${media.tablet`
    padding: 40px 0 20px;
    margin-bottom: 0;
  `};

  ${media.phablet`
    padding: 20px 0 10px;
  `};
`;

const ShellFormSectionColumn = styled.div`
  flex: ${props => (props.wide ? '0.55' : '0.45')};

  ${media.desktop`
    flex: ${props => (props.wide ? '0.6' : '0.4')};
  `};

  ${media.tablet`
    display: ${props => (props.wide ? 'block' : 'none')};
    flex: ${props => (props.wide ? '1' : '0')};
  `};
`;
