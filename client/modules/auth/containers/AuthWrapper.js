// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../ducks';
import AuthLoading from '../components/AuthLoading';

export const AuthWrapper = WrappedComponent => {
  class AuthenticatedComponent extends Component {
    state = { count: 1 };

    componentDidMount() {
      const { auth: { isAuthenticated } } = this.props;
      return this.handleCheckAuth(isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      const { auth: { isAuthenticating, isAuthenticated } } = nextProps;
      if (!isAuthenticating && !isAuthenticated) {
        return this.handleCheckAuth(isAuthenticated);
      }
    }

    handleCheckAuth(isAuthenticated: boolean) {
      const { dispatch, location } = this.props;

      /**
       * Increasing count to avoid multiple handleCheckAuth calls
       * as the Component will receive props more than once.
       */
      this.setState({ count: this.state.count + 1 });

      if (!isAuthenticated && this.state.count <= 1) {
        dispatch(auth(location.pathname));
      }
    }

    render() {
      return (
        <div className="AuthWrapper">
          {this.props.auth.isAuthenticated ? (
            <WrappedComponent {...this.props} />
          ) : (
            <AuthLoading />
          )}
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.session.auth
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default AuthWrapper;
