// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import ShellLogo from '../components/ShellLogo';
import ShellDropdownCompany from './ShellDropdownCompany';

const ShellSidebar = () =>
  <ShellSidebarContainer>
    <ShellSidebarSpace>
      <ShellLogo />
      <ShellSidebarNavContainer>
        <ShellDropdownCompany />

        <ShellSidebarNav>
          <ShellSidebarNavItem>
            <ShellSidebarNavLink
              activeStyle={{ color: '#5C6AC4' }}
              to="/account/jobs"
            >
              Jobs
            </ShellSidebarNavLink>
          </ShellSidebarNavItem>
          <ShellSidebarNavItem>
            <ShellSidebarNavLink
              activeStyle={{ color: '#5C6AC4' }}
              to="/account/company"
            >
              Company
            </ShellSidebarNavLink>
          </ShellSidebarNavItem>
          <ShellSidebarNavItem>
            <ShellSidebarNavLink
              activeStyle={{ color: '#5C6AC4' }}
              to="/account/profile"
            >
              Profile
            </ShellSidebarNavLink>
          </ShellSidebarNavItem>
        </ShellSidebarNav>
      </ShellSidebarNavContainer>
    </ShellSidebarSpace>
  </ShellSidebarContainer>;

export default ShellSidebar;

const ShellSidebarContainer = styled.nav`
  width: 250px;
  position: fixed;
  background: #f9f8f7;
  // border-right: 1px solid #eceaea;
  left: 0;
  bottom: 0;
  top: 0;
`;

const ShellSidebarSpace = styled.div`padding: 40px 0 0 50px;`;

const ShellSidebarNavContainer = styled.div`margin-top: 65px;`;

const ShellSidebarNav = styled.ul`list-style: none;`;

const ShellSidebarNavItem = styled.li``;

const ShellSidebarNavLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${props => props.theme.colors.grey.mid};
  font-size: 18px;
  margin-bottom: 25px;
`;
