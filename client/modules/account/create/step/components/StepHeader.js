import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import { Link } from 'react-router';
import PrimaryNavLogo from '../../../../nav/primary-nav/components/PrimaryNavLogo';

const StepHeader = () => (
  <StepHeaderContainer>
    <PrimaryNavLogo />
    <StepStyledLink to="/account/jobs">Exit</StepStyledLink>
  </StepHeaderContainer>
);

export default StepHeader;

const StepHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-top: 45px;
  margin: 0 50px;
  height: 70px;

  ${media.hd`
    max-width: 900px;
    margin: 0 auto;
    padding: 24px 0;
  `};

  ${media.desktop`
    padding: 0 50px;
  `};

  ${media.tablet`
    position: relative;
    width: 100%;
    padding: 0 104px;
  `};

  ${media.phablet`
    max-width: 900px;
    padding: 0 74px;
    height: 60px;
  `};

  ${media.phonePlus`
    padding: 12px 36px;
  `};

  ${media.phone`
    padding: 12px 24px;
  `};
`;

const StepStyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;
