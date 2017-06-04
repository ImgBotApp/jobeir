import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  handleOnDrop(files) {
    const { dispatch, params } = this.props;
    const file = files[0];
    const formData = new FormData();
    formData.append('logo', file);

    dispatch(uploadCompanyLogo(formData, params.companyId));
  }

  render() {
    const { company, handleSubmit, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader text={`Add your company logo`} />
        <Field
          name="logo"
          label="Company logo"
          validate={[required]}
          handleOnDrop={this.handleOnDrop}
          component={Upload}
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

const mapStateToProps = state => ({
  company: state.company
});

CompanyLogo = reduxForm({
  form: 'company-upload',
  destroyOnUnmount: false
})(CompanyLogo);

export default connect(mapStateToProps)(CompanyLogo);
