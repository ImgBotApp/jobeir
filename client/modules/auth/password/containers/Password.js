import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PasswordForm from '../../../user-input/forms/form/PasswordForm';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';

class Reset extends Component {
  render() {
    return (
      <AuthPage>
        <Helmet title="Reset Password" />
        <AuthHeader text="Reset Password" />
        <PasswordForm
          resetPasswordToken={this.props.params.resetPasswordToken}
        />
      </AuthPage>
    );
  }
}

export default Reset;
