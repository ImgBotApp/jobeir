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

`;