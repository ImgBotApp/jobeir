import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';

const PrimaryNavLogo = () => <Logo to="/" />;

export default PrimaryNavLogo;

const Logo = styled(Link)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.purple};
`;
