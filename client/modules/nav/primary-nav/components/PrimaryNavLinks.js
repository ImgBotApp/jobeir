import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
      <div>
        <Link to="/login">Log In</Link>
        <Link onClick={this.handleSignUpClick} to="/signup">Sign Up</Link>
        <a href="/auth/google">Google</a>
        <a href="/auth/facebook">Facebook</a>
        <a href="/auth/github">Github</a>
        {this.props.isAuthenticated && <Link onClick={this.handleLogoutClick}>Log Out</Link>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrimaryNavLinks);