import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import { Password, SubmitButton } from '../../inputs/input';
import { required, minLength } from '../../validation';
import { password as passwordUpdate } from '../../../auth/ducks';

class PasswordForm extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { dispatch, resetPasswordToken } = this.props;
    const { confirmPassword, password } = data;

    dispatch(passwordUpdate(resetPasswordToken, confirmPassword, password));
  }

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.auth.errors}
        theme="auth"
      >
        <Field
          name="password"
          placeholder="Password"
          validate={[required, minLength(6)]}
          component={Password}
        />
        <Field
          name="confirmPassword"
          placeholder="Confirm Password"
          validate={[required, minLength(6)]}
          component={Password}
        />
        <Field
          name="submitButton"
          buttonText="Reset Password"
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

PasswordForm = reduxForm({
  form: 'password'
})(PasswordForm);

export default connect(mapStateToProps)(PasswordForm);
