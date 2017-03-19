import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { signup } from '../../ducks/';
import SignupForm from '../../../user-input/forms/form/SignupForm';

class Signup extends Component {
  render() {
    return (
      <div>
        <Helmet title="Signup" />
        Signup
        <SignupForm />
      </div>
    );
  }
}

export default connect()(Signup);