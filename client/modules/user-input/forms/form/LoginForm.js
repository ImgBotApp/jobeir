import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Email,
  Password,
  SubmitButton
} from '../../inputs/input';
import {
  email,
  required,
} from '../../validation';
import { login } from '../../../auth/ducks';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { email, password } = data;

    this.props.dispatch(login(
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
          validate={[ required, email ]}
          component={Email}
        />
        <Field
          name="password"
          label="Password"
          validate={[ required ]}
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

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default connect(mapStateToProps)(LoginForm);