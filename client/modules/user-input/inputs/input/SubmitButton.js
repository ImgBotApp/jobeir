// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import Loader from '../../../../styles/loader';

// check if there are any form errors
const isDisabled = (errors: Array<{}> = []): boolean => errors.length >= 1;

export const SubmitButton = (props: {
  disabled: boolean,
  buttonText: string,
  isSubmitting: boolean,
  formErrors: Array<{}>
}) => (
  <Button
    type="submit"
    disabled={props.disabled || isDisabled(props.formErrors)}
  >
    {props.isSubmitting ? <Loader /> : props.buttonText || 'Submit'}
  </Button>
);

const Button = styled.button`
  border-radius: ${props => props.theme.button.borderRadius};
  border: ${props => props.theme.button.border};
  height: ${props => props.theme.button.height};
  width: ${props => props.theme.button.width};
  font-size: ${props => props.theme.button.fontSize};
  color: ${props => props.theme.button.color};
  background: ${props => props.theme.button.background};
  margin-bottom: ${props => props.theme.button.marginBottom};
  max-width: ${props => props.theme.button.maxWidth};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.55' : '1')};

  ${media.tablet`
    height: ${props => props.theme.button.tablet.height};
    border-radius: ${props => props.theme.button.tablet.borderRadius};
    max-width: ${props => props.theme.button.tablet.maxWidth};
    font-size: ${props => props.theme.button.tablet.fontSize};
  `};
`;
