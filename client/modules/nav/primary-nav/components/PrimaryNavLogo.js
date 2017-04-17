import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';

const PrimaryNavLogo = () => <Logo to="/"></Logo>;

export default PrimaryNavLogo;

const Logo = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.red};
`;