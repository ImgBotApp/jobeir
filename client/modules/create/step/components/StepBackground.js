import React from 'react';
import styled from 'styled-components';

const StepBackground = props => {
  return (
    <div>
      <StepBackgroundLeft />
      <StepBackgroundRight />
    </div>
  );
};

// Keep these here as a todo task
// <BlueBall>
// <RedBall />
// </BlueBall>
// <BlueBall />
// <BlueBall />
// <BlackBall />
// <BeigBall />

export default StepBackground;

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
  background: #f9f8f7;
  border-left: 1px solid #eceaea;
  right: 0;
  bottom: 0;
  left: 55%;
  top: 0;
  z-index: -1;
  overflow: hidden;
`;

const BlueBall = styled.div`
  position: relative;
  top: 55%;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background: ${props => props.theme.colors.blue};
  opacity: 0.2;
  left: 330px;
`;

const RedBall = styled.div`
  position: absolute;
  right: -30px;
  border-radius: 80px/80px;
  border: solid 12px ${props => props.theme.colors.red};
  width: 80px;
  height: 80px;
  opacity: 0.6;
`;

const BlackBall = styled.div`
  position: absolute;
  height: 52px;
  width: 52px;
  border-radius: 50%;
  background: ${props => props.theme.colors.black};
  right: 10px;
  bottom: -50px;
`;

const BeigBall = styled.div`
  position: absolute;
  top: -60px;
  left: -60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.beige};
  width: 150px;
  height: 150px;
`;

const PinkBall = styled.div`
  position: absolute;
  height: 76px;
  width: 76px;
  border-radius: 50%;
  background: ${props => props.theme.colors.pink};
  right: -35px;
  bottom: -30px;
`;

// rgba(251, 80, 50, 0.14);
