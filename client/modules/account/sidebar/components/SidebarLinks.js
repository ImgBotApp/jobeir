import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import { logout } from '../../../auth/ducks';
import docCookies from '../../../../utils/cookies';

class SidebarLinks extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  /**
   * handleLogoutClick()
   * Will dispatch to the server to logout the user and at the same time
   * we will remove the JWT session cookie to unauthenticate the user.
   */
  handleLogoutClick() {
    this.props.dispatch(logout());
    docCookies.removeItem('SID');
  }

  render() {
    return (
      <SidebarLinksContainer>
        <NavLink activeClassName="route-active" to="/account/dashboard">
          Dashboard
        </NavLink>
        <NavLink activeClassName="route-active" to="/account/company">
          Company
        </NavLink>
        <NavLink activeClassName="route-active" to="/account/jobs">
          Jobs
        </NavLink>
        <NavLink activeClassName="route-active" to="/account/applicants">
          Applicants
        </NavLink>
        <NavLink activeClassName="route-active" to="/account/people">
          People
        </NavLink>
        <NavLink onClick={this.handleLogoutClick}>Log Out</NavLink>
      </SidebarLinksContainer>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated
});

export default connect(mapStateToProps)(SidebarLinks);

const SidebarLinksContainer = styled.div`
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 16px;
  text-decoration: none;
  height: 34px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};

  &:last-child {
    padding-right: 13px;
  }

  &.route-active {
    color: ${props => props.theme.colors.red};
    font-weight: 600;
  }
`;
