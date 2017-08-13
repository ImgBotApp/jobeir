// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import debounce from 'lodash/debounce';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import { checkCompany } from '../../../../account/create/company/ducks';
import { Radio, SubmitButton, Text, Textarea } from '../../../inputs/input';
import { required, maxLength } from '../../../validation';

const companySizeOptions: Array<{ name: string, value: string }> = [
  { name: '1 - 9', value: '1-9' },
  { name: '10 - 49', value: '10-49' },
  { name: '50 - 149', value: '50-149' },
  { name: '150 - 499', value: '150-499' },
  { name: '500 - 999', value: '500-999' },
  { name: '1000 +', value: '1000+' }
];

class UpdateCompanyFormStepOne extends Component {
  handleCheckCompany = debounce(() => {
    const { companyName, dispatch } = this.props;

    if (companyName) dispatch(checkCompany(companyName));
  }, 400);

  formSubmit = () => {
    this.props.nextPage();
  };

  render() {
    const { handleSubmit, companies } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="marble"
      >
        <Field
          name="name"
          label="What's your company name?"
          validate={[required]}
          component={Text}
          onChange={this.handleCheckCompany}
        />
        <Field
          name="size"
          label="How many employees work at your company?"
          validate={[required]}
          options={companySizeOptions}
          type="list"
          rowWidth={32.6}
          component={Radio}
        />
        <Field
          name="product"
          label="Briefly describe your company"
          placeholder="What is your company mission? Let applicants know what your company does and what it’s like to work there."
          validate={[required, maxLength(1000)]}
          component={Textarea}
        />
        <Field
          name="submitButton"
          buttonText="Save"
          formErrors={companies.errors}
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('company');

const mapStateToProps = state => ({
  companies: state.account.companies,
  companyName: selector(state, 'name')
});

UpdateCompanyFormStepOne = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(UpdateCompanyFormStepOne);

export default connect(mapStateToProps)(UpdateCompanyFormStepOne);
