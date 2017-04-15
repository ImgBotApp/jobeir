import React from 'react';
import styled from 'styled-components';

export const InputError = props => {
  if (!props.meta) return null;

  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <InputErrorContainer>
      {
        showError &&
        <InputErrorRed>
          {meta.error}
        </InputErrorRed>
      }
    </InputErrorContainer>
  );
};

export default InputError;

const InputErrorContainer = styled.div`
  position: relative;
  top: -1.15rem;
`;

const InputErrorRed = styled.div`
  padding: 10px 20px;
  background: #fee7e8;
  color: #cc0726;
  font-size: 14px;
  border: 1px solid #cc0726;
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;
`;