import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import { Email, Password, SubmitButton } from '../../inputs/input/';
import { email, minLength, required } from '../../validation';
import { signup, login } from '../../../auth/ducks';
import { queryParams } from '../../../../utils/queryParams';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { dispatch } = this.props;
    const { email, password } = data;
    const nextValue = queryParams(window.location.search).next;

    const redirectPathname = nextValue ? nextValue : '/dashboard';

    dispatch(signup(email, password, redirectPathname));
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
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.session.auth,
});

SignupForm = reduxForm({
  form: 'signup',
})(SignupForm);

export default connect(mapStateToProps)(SignupForm);
