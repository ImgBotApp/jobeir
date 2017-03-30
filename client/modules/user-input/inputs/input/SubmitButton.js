import React from 'react';
import styled from 'styled-components';

export const SubmitButton = props => {
  return (
    <Button
      type="submit"
      disabled={false}
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
  margin: ${props => props.theme.button.margin};
  color: ${props => props.theme.button.color};
  background: ${props => props.theme.button.background};
  margin-bottom: ${props => props.theme.button.marginBottom};

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
`;