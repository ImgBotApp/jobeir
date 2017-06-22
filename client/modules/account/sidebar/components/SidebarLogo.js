import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';

const SidebarLogo = () => <Logo to="/account/jobs" />;

export default SidebarLogo;

const Logo = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 40px;
  background-color: ${props => props.theme.colors.red};
`;
