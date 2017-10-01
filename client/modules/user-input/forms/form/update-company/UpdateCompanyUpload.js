// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { SubmitButton, Upload } from '../../../inputs/input';
import { uploadCompanyLogo } from '../../../../account/create/company/ducks/';

class UpdateCompanyLogo extends Component {
  formSubmit = (): void => {
    browserHistory.push(`/account/jobs`);
  };

  handleOnDrop = (files: Array<{}>): void => {
    const { dispatch, params } = this.props;
    const file: {} = files[0];
    const formData = new FormData();
    formData.append('logo', file);

    dispatch(uploadCompanyLogo(formData, params.companyId));
  };

  handleExit = (): void => {
    browserHistory.push('/account/jobs');
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
        <Field
          name="logo"
          label="Company logo"
          handleOnDrop={this.handleOnDrop}
          isUploading={companies.isUploading}
          component={Upload}
          buttonText="Upload Logo"
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

UpdateCompanyLogo = reduxForm({
  form: 'company-upload',
  destroyOnUnmount: false
})(UpdateCompanyLogo);

export default connect(mapStateToProps)(UpdateCompanyLogo);
