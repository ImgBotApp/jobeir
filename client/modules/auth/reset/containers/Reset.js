import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ResetForm from '../../../user-input/forms/form/ResetForm';
import AuthPage from '../../components/AuthPage';
import AuthHeader from '../../components/AuthHeader';
import AuthFooter from '../../components/AuthFooter';

const Reset = () =>
  <AuthPage>
    <Helmet title="Reset your Password" />
    <AuthHeader text="Reset your Password" />
    <ResetForm />
    <AuthFooter link="/login" text="Login" />
  </AuthPage>;

export default Reset;
