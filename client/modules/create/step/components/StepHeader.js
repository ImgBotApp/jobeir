import React from 'react';
import styled from 'styled-components';
import PrimaryNavLogo from '../../../nav/primary-nav/components/PrimaryNavLogo';
import { Link } from 'react-router';

const StepHeader = () =>
  <StepHeaderContainer>
    <PrimaryNavLogo />
    <StepStyledLink to="/account/jobs">Exit</StepStyledLink>
  </StepHeaderContainer>;

export default StepHeader;

const StepHeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 26px;
  margin: 0 auto;
  height: 75px;
  max-width: ${props => props.theme.width.max};
`;

const StepStyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;
