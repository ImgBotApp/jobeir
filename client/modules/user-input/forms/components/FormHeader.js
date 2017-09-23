// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const FormHeader = (props: { text: string }) => (
  <FormHeaderContainer>
    <Header>{props.text}</Header>
  </FormHeaderContainer>
);

export default FormHeader;

const FormHeaderContainer = styled.div``;

const Header = styled.h2`
  font-size: 36px;
  margin-bottom: 50px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 900;

  ${media.tablet`
    font-size: 30px;
    margin-bottom: 30px;
  `};

  ${media.phablet`
    font-size: 26px;
    margin-bottom: 24px;
  `};
`;
