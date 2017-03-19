import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from '../../../user-input/forms/form/LoginForm';

class Signup extends Component {
  render() {
    return (
      <div>
        <Helmet title="Signup" />
        Login
        <LoginForm />
      </div>
    );
  }
}

export default connect()(Signup);