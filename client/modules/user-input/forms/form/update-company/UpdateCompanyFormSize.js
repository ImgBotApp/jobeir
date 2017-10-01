// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { Radio } from '../../../inputs/input';
import { required } from '../../../validation';
import { companySizeOptions } from '../../../options';

class UpdateCompanyFormStepOne extends Component {
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
        theme="account"
      >
        <Field
          name="size"
          label="How many employees work at your company?"
          validate={[required]}
          options={companySizeOptions}
          type="list"
          rowWidth={32.6}
          component={Radio}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

UpdateCompanyFormStepOne = reduxForm({
  form: 'company-edit',
  destroyOnUnmount: false
})(UpdateCompanyFormStepOne);

export default connect(mapStateToProps)(UpdateCompanyFormStepOne);
