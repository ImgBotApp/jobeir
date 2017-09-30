// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

export const BackButton = (props: { action: Function, buttonText: string }) => (
  <BackButtonContainer tabIndex="0" onClick={props.action}>
    <BackButtonkArrow />
    <BackButtonText>{props.buttonText || 'Back'}</BackButtonText>
  </BackButtonContainer>
);

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #676767;
  cursor: pointer;

  ${media.tablet`
    height: 60px;
    width: 50%;
    justify-content: center;
    padding-right: 10px;
  `};

  &:focus {
    ouline: auto 5px -webkit-focus-ring-color;
  }
`;

const BackButtonText = styled.span`margin-left: 5px;`;

const BackButtonkArrow = () => (
  <svg
    fill="#676767"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);
