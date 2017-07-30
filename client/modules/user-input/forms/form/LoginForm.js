// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import { Email, Password, SubmitButton } from '../../inputs/input';
import { email, required } from '../../validation';
import { login } from '../../../auth/ducks';

class LoginForm extends Component {
  formSubmit = (data: { email: string, password: string }): void => {
    const { email, password } = data;

    this.props.dispatch(login(email, password));
  };

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.auth.errors}
        theme="auth"
      >
        <Field
          name="email"
          placeholder="Email"
          validate={[required, email]}
          component={Email}
        />
        <Field
          name="password"
          placeholder="Password"
          validate={[required]}
          component={Password}
        />
        <Field
          name="submitButton"
          buttonText="Log in"
          ui={{ maxWidth: '100%' }}
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.session.auth
});

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default connect(mapStateToProps)(LoginForm);
