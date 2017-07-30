// @flow
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';

const ShellLogo = () => <Logo to="/" />;

export default ShellLogo;

const Logo = styled(Link)`
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.purple};
`;
