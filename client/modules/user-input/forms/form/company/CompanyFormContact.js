// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import {
  BackButton,
  Email,
  Phone,
  SubmitButton,
  Text
} from '../../../inputs/input';
import { email, required, phoneNumber, url } from '../../../validation';
import { parsePhone } from '../../../parse';

class CompanyFormStepTwo extends Component {
  formSubmit = () => {
    this.props.nextPage();
  };

  render() {
    const { companies, companyName, handleSubmit, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="marble"
      >
        <FormHeader text={`How can people reach out to ${companyName}?`} />
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
        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('company');

const mapStateToProps = state => ({
  companies: state.account.companies,
  companyName: selector(state, 'name')
});

CompanyFormStepTwo = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(CompanyFormStepTwo);

export default connect(mapStateToProps)(CompanyFormStepTwo);
