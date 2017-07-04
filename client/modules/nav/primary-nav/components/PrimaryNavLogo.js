import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';

const PrimaryNavLogo = () => <Logo to="/" />;

export default PrimaryNavLogo;

const Logo = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 26px;
  background-color: ${props => props.theme.colors.purple};
`;
