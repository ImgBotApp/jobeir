import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

const LegalContainer = props => (
  <LegalContainerContainer>{props.children}</LegalContainerContainer>
);

const LegalContainerContainer = styled.div`
  max-width: 748px;
  margin: 50px auto 150px;
  padding: 0 24px;

  h1 {
    font-size: 52px;
    margin-bottom: 20px;
    font-family: ${props => props.theme.fontFamily.tiempos};

    ${media.tablet`
      font-size: 32px;
    `};
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 15px;
    font-family: ${props => props.theme.fontFamily.tiempos};
  }

  p {
    line-height: 1.6;
    font-size: 18px;
    margin-bottom: 30px;

    ${media.tablet`
      margin-bottom: 20px;
    `};
  }

  section {
    margin-bottom: 60px;

    ${media.tablet`
      margin-bottom: 40px;
    `};
  }
`;

export default LegalContainer;
