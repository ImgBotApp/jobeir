import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { signup } from '../../ducks/';
import SignupForm from '../../../user-input/forms/form/signup';

class Signup extends Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    this.props.dispatch(signup());
  }

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