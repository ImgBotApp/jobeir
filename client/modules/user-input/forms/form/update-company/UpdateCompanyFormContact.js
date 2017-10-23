// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormRow from '../../components/FormRow';
import { Email, Phone, Text } from '../../../inputs/input';
import { email, required, phoneNumber, url } from '../../../validation';
import { parsePhone } from '../../../parse';

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
        theme="account"
      >
        <FormRow>
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
        </FormRow>
        <Field
          name="phone"
          label="Company phone"
          placeholder="(555) 123-4567"
          validate={[required, phoneNumber]}
          parse={parsePhone}
          component={Phone}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

CompanyFormStepTwo = reduxForm({
  form: 'company-edit',
  destroyOnUnmount: false
})(CompanyFormStepTwo);

export default connect(mapStateToProps)(CompanyFormStepTwo);
