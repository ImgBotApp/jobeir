import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks';
import AuthLoading from '../../auth/components/AuthLoading';
import AuthWrapper from '../../auth/containers/AuthWrapper';

/**
 * UserWrapper()
 * Higher Order Component that takes care of call getUser globally
 * throughout the application. UserWrapper also has wraps AuthWrapper
 * which takes care of authentication throughout the application.
 */
export const UserWrapper = WrappedComponent => {
  class UserComponent extends Component {
    state = { count: 1 };

    componentDidMount() {
      const { user: { isLoaded } } = this.props;
      return this.handleGetUser(isLoaded);
    }

    componentWillReceiveProps(nextProps) {
      const { user: { isLoaded, isFetching } } = nextProps;
      if (!isLoaded && !isFetching) {
        return this.handleGetUser(isLoaded);
      }
    }

    handleGetUser(isLoaded) {
      const { dispatch, location, auth } = this.props;
      const { count } = this.state;

      /**
       * Increasing count to avoid multiple handleCheckAuth calls
       * as the Component will receive props more than once.
       */
      this.setState({ count: this.state.count + 1 });

      if (count <= 1) {
        dispatch(getUser(auth.id));
      }
    }

    render() {
      return (
        <div className="UserWrapper">
          {this.props.user.isLoaded
            ? <WrappedComponent {...this.props} />
            : <AuthLoading />}
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.session.auth,
    user: state.session.user
  });

  return connect(mapStateToProps)(AuthWrapper(UserComponent));
};

export default UserWrapper;
