// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const InputLabel = (props: { input: { name: string }, label: string }) => (
  <LabelContainer>
    <label htmlFor={props.input.name}>{props.label}</label>
  </LabelContainer>
);

export default InputLabel;

const LabelContainer = styled.div`
  display: ${props => props.theme.label.display};
  min-width: ${props => props.theme.label.width};
  font-size: ${props => props.theme.label.fontSize};
  font-weight: ${props => props.theme.label.fontWeight};
  margin-bottom: ${props => props.theme.label.marginBottom};
  color: ${props => props.theme.label.color || 'inherit'};

  ${media.phablet`
    font-size:  ${props =>
      (props.theme.label.phablet && props.theme.label.phablet.fontSize) ||
      '16px'};
    margin-bottom:  ${props =>
      (props.theme.label.phablet && props.theme.label.phablet.marginBottom) ||
      '5px'};
  `};
`;
