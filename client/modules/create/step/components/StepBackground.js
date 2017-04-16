import React from 'react';
import styled from 'styled-components';

const StepBackground = props => {
  return (
    <StepBackgroundContainer>
      <StepBackgroundLeft />
      <StepBackgroundRight>
        <RedBall />
        <BlueBall />
        <BlackBall />
        <BeigBall />
        <PinkBall />
      </StepBackgroundRight>
    </StepBackgroundContainer>
  );
};

export default StepBackground;

const StepBackgroundContainer = styled.div`

`;

const StepBackgroundLeft = styled.div`
  position: fixed;
  background: #fff;
  right: 45%;
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
  left: 55%;
  top: 0;
  z-index: -1;
  overflow: hidden;
  opacity: 0.5;
`;

const RedBall = styled.div`
  position: absolute;
  top: 45%;
  height: 400px;
  width: 400px;
  border-radius: 50%;
  background: ${props => props.theme.red};
  left: 230px;
`;

const BlueBall = styled.div`
  position: absolute;
  top: -80px;
  height: 450px;
  width: 450px;
  border-radius: 50%;
  background: ${props => props.theme.blue};
  left: 150px;
`;

const BlackBall = styled.div`
  position: absolute;
  bottom: -20px;
  height: 270px;
  width: 270px;
  border-radius: 50%;
  background: ${props => props.theme.black};
  left: -50px;
`;

const BeigBall = styled.div`
  position: absolute;
  bottom: 340px;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  background: ${props => props.theme.beige};
  left: -50px;
`;

const PinkBall = styled.div`
  position: absolute;
  bototm: 0px;
  height: 400px;
  width: 400px;
  border-radius: 50%;
  background: ${props => props.theme.pink};
  right: -250px;
`;

// rgba(251, 80, 50, 0.14);