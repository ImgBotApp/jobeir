import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../ducks';

export const AuthWrapper = WrappedComponent => {
  class AuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { count: 1 };
    }

    componentWillMount() {
      const { auth: { isAuthenticated } } = this.props;
      return this.handleCheckAuth(isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      const { auth: { isAuthenticating, isAuthenticated } } = nextProps;
      if (!isAuthenticating && !isAuthenticated) {
        return this.handleCheckAuth(isAuthenticated);
      }
    }

    handleCheckAuth(isAuthenticated) {
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
        <div>
          {
            this.props.auth.isAuthenticated
            ? <div className="Authenticated">
                <WrappedComponent {...this.props} />
              </div>
            : <div>Loading...</div>
          }
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default AuthWrapper;
