import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { required, maxLength } from '../../../validation';
import { Select, SubmitButton, Text, Textarea } from '../../../inputs/input';
import { checkCompany, createCompany } from '../../../../create/company/ducks';
import debounce from 'lodash/debounce';

const companySizeOptions = [
  { name: 'Select size', disabled: true, value: '' },
  { name: '1 - 9', value: '1 - 9' },
  { name: '10 - 49', value: '10 - 49' },
  { name: '50 - 149', value: '50 - 149' },
  { name: '150 - 499', value: '150 - 499' },
  { name: '500 - 999', value: '500 - 999' },
  { name: '1000 +', value: '1000 +' }
];

class CompanyFormStepOne extends Component {
  constructor(props) {
    super(props);

    this.handleCheckCompany = debounce(this.handleCheckCompany, 400).bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleCheckCompany() {
    const { companyName, dispatch } = this.props;

    if (companyName) dispatch(checkCompany(companyName));
  }

  formSubmit(data) {}

  formSubmit(data) {
    this.props.dispatch(createCompany(data));

    this.props.nextPage();
  }

  render() {
    const { handleSubmit, company } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader text="Tell us about your company" />
        <Field
          name="name"
          label="What's your company name?"
          validate={[required]}
          component={Text}
          onChange={this.handleCheckCompany}
        />
        <Field
          name="companySize"
          label="How many employees work at your company?"
          validate={[required]}
          options={companySizeOptions}
          component={Select}
        />
        <Field
          name="product"
          label="Briefly describe your company"
          placeholder="What is your company mission? Let applicants know what your company does and what it’s like to work there."
          validate={[required, maxLength(500)]}
          component={Textarea}
        />
        <FormFooter>
          <Field
            name="submitButton"
            buttonText="Next"
            formErrors={company.errors}
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('company');

const mapStateToProps = state => ({
  company: state.company,
  companyName: selector(state, 'name')
});

CompanyFormStepOne = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(CompanyFormStepOne);

export default connect(mapStateToProps)(CompanyFormStepOne);
