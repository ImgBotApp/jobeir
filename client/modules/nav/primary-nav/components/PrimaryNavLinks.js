import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import docCookies from '../../../../utils/cookies';
import { logout } from '../../../auth/ducks';

class PrimaryNavLinks extends Component {
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
      <div>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <a href="/auth/google">Google</a>
        {this.props.isAuthenticated && <Link onClick={this.handleLogoutClick}>Log Out</Link>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrimaryNavLinks);