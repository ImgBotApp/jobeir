// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormRow from '../components/FormRow';
import { required, phoneNumber } from '../../validation';
import { Text, Phone, SubmitButton } from '../../inputs/input';
import { updateUser } from '../../../user/ducks/';
import { parsePhone } from '../../../user-input/parse';

class ProfileEditForm extends Component {
  formSubmit = (data: {}): void => {
    const { dispatch, user } = this.props;
    dispatch(updateUser(user._id, data));
  };
  render() {
    const { handleSubmit, user } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={user.errors}
        theme="account"
      >
        <FormRow>
          <Field
            name="firstName"
            label="First name"
            placeholder="First name"
            validate={[required]}
            component={Text}
          />
          <Field
            name="lastName"
            label="Last name"
            placeholder="Last name"
            validate={[required]}
            component={Text}
          />
        </FormRow>
        <Field
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          validate={[phoneNumber]}
          parse={parsePhone}
          component={Phone}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Field
            name="submitButton"
            buttonText="Save"
            isSubmitting={user.isUpdating}
            component={SubmitButton}
          />
        </div>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    firstName: state.session.user.firstName,
    lastName: state.session.user.lastName
  },
  user: state.session.user
});

ProfileEditForm = reduxForm({
  form: 'profile',
  destroyOnUnmount: false
})(ProfileEditForm);

export default connect(mapStateToProps)(ProfileEditForm);
