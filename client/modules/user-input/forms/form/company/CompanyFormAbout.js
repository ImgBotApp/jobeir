// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import debounce from 'lodash/debounce';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { checkCompany } from '../../../../account/create/company/ducks';
import { Radio, SubmitButton, Text, Textarea } from '../../../inputs/input';
import { required, maxLength } from '../../../validation';
import { companySizeOptions } from '../../../options';

class CompanyFormStepOne extends Component {
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
        <FormHeader text="Tell us about your company" />
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
          label={
            <div>
              <span>Briefly describe your company.</span>
              <span style={{ opacity: 0.4, display: 'block', margin: '7px 0' }}>
                This will appear in search results previews.
              </span>
            </div>
          }
          placeholder="Explain your company values and mission! Let applicants know what your company does and what it’s like to work there."
          validate={[required, maxLength(1000)]}
          component={Textarea}
        />
        <FormFooter>
          <Field
            name="submitButton"
            buttonText="Next"
            formErrors={companies.errors}
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

CompanyFormStepOne = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(CompanyFormStepOne);

export default connect(mapStateToProps)(CompanyFormStepOne);
