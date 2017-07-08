import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import docCookies from '../../../../utils/cookies';
import { logout } from '../../../auth/ducks';
import { showModal } from '../../../modal/ducks';

class PrimaryNavLinks extends Component {
  constructor(props) {
    super(props);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSignUpClick() {
    const { dispatch } = this.props;
    dispatch(showModal('AUTH_MODAL', { dispatch }));
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

  /**
   * buildMainNavigation()
   * Takes care of the authenticated or not authenticated version of the
   * primary navigation.
   */
  buildMainNavigation(isAuthenticated) {
    return isAuthenticated
      ? <NavLinkContainer>
          <NavLink to="/account/jobs">Dashboard</NavLink>
          <NavLink onClick={this.handleLogoutClick}>Log out</NavLink>
        </NavLinkContainer>
      : <NavLinkContainer>
          <NavLink onClick={this.handleSignUpClick}>Post Job / Sign up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </NavLinkContainer>;
  }

  render() {
    const { pathname, isAuthenticated } = this.props;

    return (
      <PrimaryNavLinksContainer>
        {this.buildMainNavigation(isAuthenticated)}
      </PrimaryNavLinksContainer>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated,
  pathname:
    (state.routing.locationBeforeTransitions &&
      state.routing.locationBeforeTransitions.pathname) ||
    ''
});

export default connect(mapStateToProps)(PrimaryNavLinks);

const PrimaryNavLinksContainer = styled.div`display: flex;`;

const NavLinkContainer = styled.div`display: flex;`;

const NavLink = styled(Link)`
  display: block;
  padding: 0 26px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  height: 64px;
  line-height: 64px;
  color: ${props => props.theme.colors.text}

  &:last-child {
    padding-right: 13px;
  }
`;
