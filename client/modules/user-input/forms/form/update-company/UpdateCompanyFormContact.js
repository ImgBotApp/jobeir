// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormRow from '../../components/FormRow';
import { Email, Phone, SubmitButton, Text } from '../../../inputs/input';
import { email, required, phoneNumber, url } from '../../../validation';

const parsePhone = (value: number): string =>
  value.toString().replace(/\D/g, '');

class CompanyFormStepTwo extends Component {
  formSubmit = () => {
    this.props.nextPage();
  };

  render() {
    const { companies, handleSubmit } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="marble"
      >
        <Field
          name="website"
          label="Company website"
          placeholder="https://example.com"
          validate={[required, url]}
          component={Text}
        />
        <Field
          name="email"
          label="Company email"
          placeholder="email@example.com"
          validate={[email, required]}
          component={Email}
        />
        <Field
          name="phone"
          label="Company phone"
          placeholder="(555) 123-4567"
          validate={[required, phoneNumber]}
          parse={parsePhone}
          component={Phone}
        />
        <Field name="submitButton" buttonText="Save" component={SubmitButton} />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

CompanyFormStepTwo = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(CompanyFormStepTwo);

export default connect(mapStateToProps)(CompanyFormStepTwo);
