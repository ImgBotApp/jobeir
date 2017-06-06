import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, SubmitButton, Upload } from '../../../inputs/input';
import { required } from '../../../validation';
import { uploadCompanyLogo } from '../../../../create/company/ducks/';

class CompanyLogo extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  formSubmit() {
    console.log('fired');
    browserHistory.push(`/complete/company/${this.props.params.companyId}`);
  }

  handleOnDrop(files) {
    const { dispatch, params } = this.props;
    const file = files[0];
    const formData = new FormData();
    formData.append('logo', file);

    dispatch(uploadCompanyLogo(formData, params.companyId));
  }

  handleExit() {
    browserHistory.push('/dashboard');
  }

  render() {
    const { company, handleSubmit } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader text="Add your company logo to attract the best applicants" />
        <Field
          name="logo"
          label="Company logo"
          handleOnDrop={this.handleOnDrop}
          isUploading={company.isUploading}
          component={Upload}
          buttonText="Upload Logo"
        />
        <FormFooter isUpload={true}>
          <BackButton action={this.handleExit} buttonText="Exit" />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
            disabled={!company.successfulUpload}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

CompanyLogo = reduxForm({
  form: 'company-upload',
  destroyOnUnmount: false
})(CompanyLogo);

export default connect(mapStateToProps)(CompanyLogo);
