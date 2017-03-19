import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Email,
  Password,
  SubmitButton
} from '../../inputs/input/';
import { signup } from '../../../auth/ducks';


class SignupForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { email, password } = data;

    this.props.dispatch(signup(
      email,
      password,
    ));
  }

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.auth.errors}
      >
        <Field
          name="email"
          label="Email"
          component={Email}
        />
        <Field
          name="password"
          label="Password"
          component={Password}
        />
        <Field
          name="submitButton"
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
});

SignupForm = reduxForm({
  form: 'signup',
})(SignupForm);

export default connect(mapStateToProps)(SignupForm);