// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
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
    const { auth, handleSubmit } = this.props;

    return (
      <LoginFormContainer>
        <FormWrapper
          handleSubmit={handleSubmit}
          formSubmit={this.formSubmit}
          formErrors={auth.errors}
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
            buttonText="Sign in"
            ui={{ maxWidth: '100%' }}
            isSubmitting={auth.isAuthenticating}
            component={SubmitButton}
          />
        </FormWrapper>
      </LoginFormContainer>
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

const LoginFormContainer = styled.div`
  padding: 18px;
  flex: 1;

  ${media.phablet`
    padding: 12px 0;
  `};
`;
