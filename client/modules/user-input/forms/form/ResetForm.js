// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize, Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import FormWrapper from '../containers/FormWrapper';
import { Email, SubmitButton } from '../../inputs/input';
import { email, required } from '../../validation';
import { reset } from '../../../auth/ducks';

class ResetForm extends Component {
  state = {
    showResetSuccess: false
  };

  formSubmit = (data: { email: string }) => {
    const { dispatch } = this.props;

    dispatch(reset(data.email)).then(() => {
      this.setState({ showResetSuccess: true });
      dispatch(initialize('reset', { email: '' }));
    });
  };

  render() {
    const { auth, handleSubmit } = this.props;

    return (
      <ResetContainer>
        <FormWrapper
          handleSubmit={handleSubmit}
          formSubmit={this.formSubmit}
          formErrors={auth.errors}
          theme="auth"
        >
          <Field
            key="email"
            name="email"
            placeholder="Email"
            validate={[required, email]}
            component={Email}
          />
          <Field
            key="submitButton"
            name="submitButton"
            buttonText="Reset Password"
            ui={{ maxWidth: '100%' }}
            isSubmitting={auth.isResettingPassword}
            component={SubmitButton}
          />
          {this.state.showResetSuccess && (
            <ResetSuccessContainer>
              <ResetSuccessText>
                Please check your email and follow the instructions to complete
                resetting your password.
              </ResetSuccessText>
            </ResetSuccessContainer>
          )}
        </FormWrapper>
      </ResetContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.session.auth
});

ResetForm = reduxForm({
  form: 'reset',
  forceUnregisterOnUnmount: true
})(ResetForm);

export default connect(mapStateToProps)(ResetForm);

const ResetContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const ResetSuccessContainer = styled.div`text-align: center;`;

const ResetSuccessText = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  background: rgba(92, 106, 195, 0.02);
  padding: 20px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.purple};
  line-height: 1.6;
`;
