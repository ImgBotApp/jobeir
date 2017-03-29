import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Email,
  Password,
  SubmitButton
} from '../../inputs/input/';
import {
  email,
  minLength,
  required,
} from '../../validation';
import { signup, login } from '../../../auth/ducks';


class SignupForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { dispatch } = this.props;
    const { email, password } = data;

    dispatch(signup(email, password));
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
          validate={[ required, email ]}
          component={Email}
        />
        <Field
          name="password"
          label="Password"
          validate={[ required, minLength(6) ]}
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