// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import { Password, SubmitButton } from '../../inputs/input';
import { required, minLength } from '../../validation';
import { password as passwordUpdate } from '../../../auth/ducks';

class PasswordForm extends Component {
  formSubmit = (data: { confirmPassword: string, password: string }): void => {
    const { dispatch, resetPasswordToken } = this.props;
    const { confirmPassword, password } = data;

    dispatch(passwordUpdate(resetPasswordToken, confirmPassword, password));
  };

  render() {
    const { auth, handleSubmit } = this.props;

    return (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <FormWrapper
          handleSubmit={handleSubmit}
          formSubmit={this.formSubmit}
          formErrors={auth.errors}
          theme="auth"
        >
          <Field
            name="password"
            placeholder="New password"
            validate={[required, minLength(6)]}
            component={Password}
          />
          <Field
            name="confirmPassword"
            placeholder="Confirm new password"
            validate={[required, minLength(6)]}
            component={Password}
          />
          <Field
            name="submitButton"
            buttonText="Reset Password"
            ui={{ maxWidth: '100%' }}
            isSubmitting={auth.isResettingPassword}
            component={SubmitButton}
          />
        </FormWrapper>
      </div>
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
