import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { required } from '../../../validation';
import { BackButton, Radio, Select, SubmitButton } from '../../../inputs/input';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);

const jobTypes = [
  { name: 'Full-time', value: 'Full-time' },
  { name: 'Part-time', value: 'Part-time' },
  { name: 'Contractor', value: 'Contractor' },
  { name: 'Freelance', value: 'Freelance' },
  { name: 'Intern', value: 'Intern' },
  { name: 'Volunteer', value: 'Volunteer' }
];

const yesNoOptions = [
  { text: 'Yes', value: 'Yes' },
  { text: 'No', value: 'No' }
];

class JobFormType extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  buildLocationsDropdown() {
    const { companies, params } = this.props;
    const activeCompany = companies.created.find(
      comp => comp._id === params.companyId
    );

    return (
      activeCompany &&
      activeCompany.locations.map(location => {
        return {
          name: `${location.street}, ${location.city}, ${location.country}`,
          value: location
        };
      })
    );
  }

  formSubmit() {
    this.props.nextPage();
  }

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
          label="Employment Type"
          validate={[required]}
          options={jobTypes}
          type="list"
          component={Radio}
        />
        <Field
          name="address"
          label="Where will the employee be working?"
          validate={[required]}
          options={this.buildLocationsDropdown()}
          component={Select}
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
  companies: state.companies,
  jobs: state.jobs,
  auth: state.session.auth
});

JobFormType = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true
})(JobFormType);

export default connect(mapStateToProps)(JobFormType);
