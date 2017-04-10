import React from 'react';
import styled from 'styled-components';

export const BackButton = props => {
  return (
    <BackButtonContainer>
      <BackButtonkArrow />
      {props.buttonText || 'Back'}
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #676767;
`;

const BackButtonkArrow = () => <svg fill="#676767" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;