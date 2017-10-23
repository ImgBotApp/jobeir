// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormRow from '../components/FormRow';
import { Email, Password, SubmitButton, Text } from '../../inputs/input/';
import { email, minLength, required } from '../../validation';
import { signup } from '../../../auth/ducks';
import { queryParams } from '../../../../utils/queryParams';

class SignupForm extends Component {
  formSubmit = (data: {}): void => {
    const { dispatch } = this.props;
    const nextValue: string = queryParams(window.location.search).next;
    const redirectPathname: string = nextValue || '/account/jobs';

    dispatch(signup(data, redirectPathname));
  };

  render() {
    const { auth, handleSubmit } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={auth.errors}
        theme="auth"
      >
        <FormRow>
          <Field
            name="firstName"
            placeholder="First name"
            validate={[required]}
            component={Text}
          />
          <Field
            name="lastName"
            placeholder="Last name"
            validate={[required]}
            component={Text}
          />
        </FormRow>
        <Field
          name="email"
          placeholder="Email address"
          validate={[required, email]}
          component={Email}
        />
        <Field
          name="password"
          placeholder="Create a password"
          validate={[required, minLength(6)]}
          component={Password}
        />
        <Field
          name="submitButton"
          buttonText="Sign up"
          ui={{ maxWidth: '100%' }}
          isSubmitting={auth.isAuthenticating}
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.session.auth
});

SignupForm = reduxForm({
  form: 'signup'
})(SignupForm);

export default connect(mapStateToProps)(SignupForm);
