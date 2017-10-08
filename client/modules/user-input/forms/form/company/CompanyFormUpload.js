// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, SubmitButton, Upload } from '../../../inputs/input';
import { uploadCompanyLogo } from '../../../../account/create/company/ducks/';

class CompanyLogo extends Component {
  formSubmit = (): void => {
    browserHistory.push(`/create/${this.props.params.companyId}`);
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
        theme="marble"
      >
        <FormHeader text="Upload your company logo" />
        <Field
          name="logo"
          label="Company logo"
          handleOnDrop={this.handleOnDrop}
          isUploading={companies.isUploading}
          component={Upload}
          buttonText="Upload Logo"
        />
        <UploadedList>
          <UploadedListItem>
            Logos with a transparent backgrounds in PNG format provide the best
            results
          </UploadedListItem>
          <UploadedListItem>Max size file size 2Mb</UploadedListItem>
        </UploadedList>
        <FormFooter>
          <BackButton action={this.handleExit} buttonText="Exit" />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
            disabled={!companies.successfulUpload}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

CompanyLogo = reduxForm({
  form: 'company-upload',
  destroyOnUnmount: false
})(CompanyLogo);

export default connect(mapStateToProps)(CompanyLogo);

const UploadedList = styled.ul`
  display: inline-block;
  margin-top: 15px;
  padding-left: 20px;
`;

const UploadedListItem = styled.li`margin-bottom: 15px;`;
