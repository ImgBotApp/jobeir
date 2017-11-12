import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import { media } from '../../../../styles/breakpoints';
import { JobeirLogo } from '../../../../icons';

const PrimaryNavLogo = () => (
  <LogoLink to="/">
    <JobeirLogo />
  </LogoLink>
);

export default PrimaryNavLogo;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;

  svg {
    width: 100px;

    ${media.tablet`
      width: 80px;
    `};
  }
`;
