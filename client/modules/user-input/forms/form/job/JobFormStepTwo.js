import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { required } from '../../../validation';
import {
  BackButton,
  Radio,
  Currency,
  Phone,
  Select,
  SubmitButton,
  Textarea,
  Text,
} from '../../../inputs/input';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);

const jobTypes = [
  { name: 'Select type', disabled: true, value: '' },
  { name: 'Full-time', value: 'FULL_TIME' },
  { name: 'Part-time', value: 'PART_TIME' },
  { name: 'Contractor', value: 'CONTRACTOR' },
  { name: 'Freelance', value: 'FREELANCE' },
  { name: 'Intern', value: 'INTERN' },
  { name: 'Volunteer', value: 'VOLUNTEER' },
];

const remoteOptions = [
  { text: 'Yes', value: 'Yes' },
  { text: 'No', value: 'No' },
];

class JobFormStepTwo extends Component {
  constructor(props) {
     super(props);
     
     this.formSubmit = this.formSubmit.bind(this);
   }

  formSubmit() {
    this.props.nextPage();
  }

  render() {
    const {
      handleSubmit,
      job,
      previousPage,
    } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={job.errors}
        theme="marble"
      >
        <FormHeader
          text="What kind of job is it?"
        />
        <Field
          name="type"
          label="Job Type"
          validate={[ required ]}
          options={jobTypes}
          component={Select}
        />
        <Field
          name="locations"
          label="Locations"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="remote"
          label="Is this a remote position?"
          options={remoteOptions}
          component={Radio}
        />
        <FormFooter>
          <BackButton
            action={previousPage}
            buttonText="Back"
          />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
};

const mapStateToProps = state => ({
  job: state.job,
  auth: state.session.auth,
});

JobFormStepTwo = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(JobFormStepTwo);

export default connect(mapStateToProps)(JobFormStepTwo);