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

  render() {
    return (
      <PrimaryNavLinksContainer>        
        {
          this.props.isAuthenticated
            ? <NavLinkContainer>
                <NavLink to="/create/job/about">Post Job</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink onClick={this.handleLogoutClick}>Log Out</NavLink>
              </NavLinkContainer>
            : <NavLinkContainer>
                <NavLink to="/create/job/about">Post Job</NavLink>
                <NavLink onClick={this.handleSignUpClick}>Sign Up</NavLink>
                <NavLink to="/login">Log In</NavLink>
              </NavLinkContainer>
        }
      </PrimaryNavLinksContainer>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrimaryNavLinks);

const PrimaryNavLinksContainer = styled.div`
  display: flex;
`;

const NavLinkContainer = styled.div`
  display: flex;
`;

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
