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
import { createJob } from '../../../create/job/ducks';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);

const jobTypes = [
  { name: 'Full-time', value: 'FULL_TIME' },
  { name: 'Part-time', value: 'PART_TIME' },
  { name: 'Contractor', value: 'CONTRACTOR' },
  { name: 'Freelance', value: 'FREELANCE' },
  { name: 'Intern', value: 'INTERN' },
  { name: 'Volunteer', value: 'VOLUNTEER' },
];

class JobForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.dispatch(createJob(data))
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
          name="title"
          label="Job Title"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="description"
          label="Description"
          validate={[ required ]}
          component={Textarea}
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
          label="Remote"
          component={Checkbox}
        />
        <Field
          name="salaryMin"
          label="Salary Min"
          validate={[ required ]}
          parse={parseNumber}
          component={Currency}
        />
        <Field
          name="salaryMax"
          label="Salary Max"
          validate={[ required ]}
          parse={parseNumber}
          component={Currency}
        />
        <Field
          name="submitButton"
          buttonText="Review"
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

JobForm = reduxForm({
  form: 'job',
})(JobForm);

export default connect(mapStateToProps)(JobForm);