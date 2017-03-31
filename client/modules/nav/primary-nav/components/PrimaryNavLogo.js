import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';

const PrimaryNavLogo = () => <Logo to="/"></Logo>;

export default PrimaryNavLogo;

const Logo = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.red};
`;