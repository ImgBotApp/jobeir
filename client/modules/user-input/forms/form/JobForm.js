import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Currency,
  Phone,
  Text,
  Select,
  Textarea,
  SubmitButton
} from '../../inputs/input/';
import {
  required,
} from '../../validation';
import { createJob } from '../../../create/job/ducks'


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
        formErrors={this.props.auth.errors}
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
          name="role"
          label="Primary Role"
          validate={[ required ]}
          options={[]}
          component={Select}
        />
        <Field
          name="type"
          label="Job Type"
          validate={[ required ]}
          options={[]}
          component={Select}
        />
        <Field
          name="location"
          label="Locations"
          validate={[ required ]}
          options={[]}
          component={Select}
        />
        <Field
          name="remote"
          label="Remote"
          validate={[ required ]}
          options={[]}
          component={Select}
        />
        <Field
          name="salaryMin"
          label="Salary Min"
          validate={[ required ]}
          component={Currency}
        />
        <Field
          name="salaryMax"
          label="Salary Max"
          validate={[ required ]}
          component={Currency}
        />
        <Field
          name="submitButton"
          buttonText="Review"
          validate={[ required ]}
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.session.auth,
});

JobForm = reduxForm({
  form: 'job',
})(JobForm);

export default connect(mapStateToProps)(JobForm);