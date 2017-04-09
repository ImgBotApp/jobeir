import React from 'react';
import styled from 'styled-components';

export const InputLabel = props => {
  return (
    <LabelContainer>
      <label htmlFor={props.input.name}>
        {props.label}
      </label>
    </LabelContainer>
  );
};

export default InputLabel;

const LabelContainer = styled.div`
  display: ${props => props.theme.label.display};
  font-size: ${props => props.theme.label.fontSize};
  margin-bottom: ${props => props.theme.label.marginBottom};
`;

