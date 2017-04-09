import React from 'react';
import styled from 'styled-components';

const StepBackground = props => {
  return (
    <StepBackgroundContainer>
      <StepBackgroundLeft />
      <StepBackgroundRight />
    </StepBackgroundContainer>
  );
};

export default StepBackground;

const StepBackgroundContainer = styled.div`

`;

const StepBackgroundLeft = styled.div`
  position: fixed;
  background: #fff;
  right: 40%;
  bottom: 0;
  left: 0%;
  top: 0;
  z-index: -1;
`;

const StepBackgroundRight = styled.div`
  position: fixed;
  max-width: 1280px;
  background: #fafafa;
  border-left: 1px solid #eceaea;
  right: 0;
  bottom: 0;
  left: 60%;
  top: 0;
  z-index: -1;
`;
