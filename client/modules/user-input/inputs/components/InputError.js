// @flow
import React from 'react';
import styled from 'styled-components';

const InputError = (props: {
  meta: { touched: boolean, error: boolean, invalid: boolean }
}) => {
  const { meta } = props;

  if (!meta) return null;

  const showError: boolean = meta.touched && meta.error && meta.invalid;

  return (
    <InputErrorContainer>
      {showError &&
        <InputErrorRed>
          {meta.error}
        </InputErrorRed>}
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
  color: #f73c3c;
  font-size: 14px;
  border: 1px solid #f73c3c;
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;
`;
