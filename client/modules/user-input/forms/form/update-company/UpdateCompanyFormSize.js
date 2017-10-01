// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { Radio } from '../../../inputs/input';
import { required } from '../../../validation';

const companySizeOptions: Array<{ name: string, value: string }> = [
  { name: '1 - 9', value: '1-9' },
  { name: '10 - 49', value: '10-49' },
  { name: '50 - 149', value: '50-149' },
  { name: '150 - 499', value: '150-499' },
  { name: '500 - 999', value: '500-999' },
  { name: '1000 +', value: '1000+' }
];

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
