// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
/**
 * FormRow
 * Will for the children to go on a single row
 * and apply a width of 48% to each child div
 */
const FormRow = (props: { children: any, alwaysRow: boolean }) => (
  <FormRowContainer alwaysRow={props.alwaysRow}>
    {props.children}
  </FormRowContainer>
);

export default FormRow;

const FormRowContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.phablet`
    flex-direction: ${props => (props.alwaysRow ? 'row' : 'column')};
    width: 100%;
  `};

  & > div {
    width: 48%;

    ${media.phablet`
      width: ${props => (props.alwaysRow ? '48%' : '100%')};
    `};
  }
`;
