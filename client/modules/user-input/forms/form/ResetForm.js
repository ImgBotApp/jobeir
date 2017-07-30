// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import { Email, SubmitButton } from '../../inputs/input';
import { email, required } from '../../validation';
import { reset } from '../../../auth/ducks';

class ResetForm extends Component {
  formSubmit = (data: { email: string }): void => {
    this.props.dispatch(reset(data.email));
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

ResetForm = reduxForm({
  form: 'reset'
})(ResetForm);

export default connect(mapStateToProps)(ResetForm);
