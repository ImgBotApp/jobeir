import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import SidebarLinksDropdown from '../containers/SidebarLinksDropdown';

// The sidebar navigation gets built from this array
const sidebarLinksData = ['Jobs', 'Company', 'People'];

const SidebarLinks = () => (
  <div>
    <SidebarLinksDropdown />
    {sidebarLinksData.map(link => (
      <NavLink
        key={link}
        activeClassName="route-active"
        to={`/account/${link.toLowerCase()}`}
      >
        {link}
      </NavLink>
    ))}
  </div>
);

export default SidebarLinks;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 16px;
  text-decoration: none;
  height: 40px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => (props.company ? '15px' : '0px')};

  &:last-child {
    padding-right: 13px;
  }

  &.route-active {
    color: ${props => props.theme.colors.red};
    font-weight: 600;
  }

  svg {
    padding: 3px;
    position: relative;
    top: -1px;
    fill: rgba(0,0,0,0.8);
  }
`;
