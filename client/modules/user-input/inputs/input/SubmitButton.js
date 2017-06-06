import React from 'react';
import styled from 'styled-components';

// check if there are any form errors
const isDisabled = (errors = []) => {
  return errors.length >= 1;
};

export const SubmitButton = props => {
  return (
    <Button
      type="submit"
      disabled={props.disabled || isDisabled(props.formErrors)}
    >
      {props.buttonText || 'Submit'}
    </Button>
  );
};

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
`;
