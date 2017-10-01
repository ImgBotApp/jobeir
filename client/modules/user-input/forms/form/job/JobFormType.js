// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { required } from '../../../validation';
import { BackButton, Radio, SubmitButton } from '../../../inputs/input';
import { jobTypeOptions, yesNoOptions } from '../../../options';

class JobFormType extends Component {
  buildLocationsDropdown() {
    const { companies, params } = this.props;
    const activeCompany: {
      locations: Array<{
        address: {
          unit: string,
          street_number: string,
          route: string,
          locality: string,
          country: string
        }
      }>
    } = companies.created.find(comp => comp._id === params.companyId);

    return (
      activeCompany &&
      activeCompany.locations.map(location => {
        const {
          unit,
          street_number,
          route,
          locality,
          country
        } = location.address;
        const noUnit = `${street_number} ${route}, ${locality}, ${country}`;
        const completeAddress = unit ? `${unit} - ${noUnit}` : noUnit;

        return {
          name: completeAddress,
          value: location
        };
      })
    );
  }

  formSubmit = (): void => {
    this.props.nextPage();
  };

  render() {
    const { handleSubmit, jobs, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <FormHeader text="What kind of job is it?" />
        <Field
          name="employmentType"
          label="Select the type"
          validate={[required]}
          options={jobTypeOptions}
          type="list"
          component={Radio}
        />
        <Field
          name="address"
          label="Where will the employee be working?"
          validate={[required]}
          options={this.buildLocationsDropdown()}
          type="list"
          row="full"
          component={Radio}
        />
        <Field
          name="remote"
          label="Is this a remote position?"
          validate={[required]}
          options={yesNoOptions}
          type="yes/no"
          component={Radio}
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
  companies: state.account.companies,
  jobs: state.account.jobs,
  auth: state.session.auth
});

JobFormType = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true
})(JobFormType);

export default connect(mapStateToProps)(JobFormType);
