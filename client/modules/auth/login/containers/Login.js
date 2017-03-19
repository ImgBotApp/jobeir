import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from '../../../user-input/forms/form/LoginForm';
import AuthOAuth from '../../components/AuthOAuth';

class Signup extends Component {
  render() {
    return (
      <div>
        <Helmet title="Signup" />
        Login
        <AuthOAuth />
        <LoginForm />
      </div>
    );
  }
}

export default connect()(Signup);