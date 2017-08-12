// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormFooter from '../components/FormFooter';
import FormRow from '../components/FormRow';
import { required, phoneNumber } from '../../validation';
import { Text, Phone, SubmitButton } from '../../inputs/input';
import { updateUser } from '../../../user/ducks/';

const parsePhone = (value: number): string =>
  value.toString().replace(/\D/g, '');

class ProfileEditForm extends Component {
  formSubmit = (data: {}): void => {
    const { dispatch, user } = this.props;
    console.log(data);
    dispatch(updateUser(user._id, data));
  };
  render() {
    const { handleSubmit, user } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={user.errors}
        theme="marble"
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
        <FormRow>
          <Field
            name="phone"
            label="Your phone number"
            placeholder="(555) 123-4567"
            validate={[phoneNumber]}
            parse={parsePhone}
            component={Phone}
          />
        </FormRow>
        <Field
          name="submitButton"
          buttonText="Save"
          isSubmitting={user.isUpdating}
          component={SubmitButton}
        />
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
