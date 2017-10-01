// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { Textarea } from '../../../inputs/input';
import { required, maxLength } from '../../../validation';

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
          name="product"
          label="Briefly describe your company"
          placeholder="What is your company mission? Let applicants know what your company does and what it’s like to work there."
          validate={[required, maxLength(1000)]}
          component={Textarea}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => {
  const init = state.session.user.companies.find(
    company => company._id === state.account.companies.activeCompany._id
  );

  return {
    companies: state.account.companies,
    initialValues: {
      product: init.product,
      phone: init.phone.toString(),
      website: init.website,
      size: init.size,
      locations: init.locations
    }
  };
};

UpdateCompanyFormStepOne = reduxForm({
  form: 'company-edit',
  destroyOnUnmount: false
})(UpdateCompanyFormStepOne);

export default connect(mapStateToProps)(UpdateCompanyFormStepOne);
