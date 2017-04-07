import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Checkbox,
  Currency,
  Phone,
  Text,
  Select,
  Textarea,
  SubmitButton
} from '../../inputs/input';
import {
  required,
} from '../../validation';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);

const jobTypes = [
  { name: 'Full-time', value: 'FULL_TIME' },
  { name: 'Part-time', value: 'PART_TIME' },
  { name: 'Contractor', value: 'CONTRACTOR' },
  { name: 'Freelance', value: 'FREELANCE' },
  { name: 'Intern', value: 'INTERN' },
  { name: 'Volunteer', value: 'VOLUNTEER' },
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
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.job.errors}
        theme="marble"
      >
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
          label="Remote"
          component={Checkbox}
        />
        <button type="button" className="previous" onClick={this.props.previousPage}>Previous</button>
        <Field
          name="submitButton"
          buttonText="Next"
          component={SubmitButton}
        />
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