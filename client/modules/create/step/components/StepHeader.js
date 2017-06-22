import React from 'react';
import styled from 'styled-components';
import PrimaryNavLogo from '../../../nav/primary-nav/components/PrimaryNavLogo';
import { Link } from 'react-router';

const StepHeader = () => (
  <StepHeaderContainer>
    <PrimaryNavLogo />
    <StepStyledLink to="/account/jobs">Exit</StepStyledLink>
  </StepHeaderContainer>
);

export default StepHeader;

const StepHeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 20px 30px;
  box-shadow: ${props => (props.isAuthenticated ? '0px 1px 2px rgba(0, 0, 0, 0.16)' : 'none')};
`;

const StepStyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;
