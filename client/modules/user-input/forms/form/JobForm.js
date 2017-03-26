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

class JobForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    console.log({ data });
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
          component={Text}
        />
        <Field
          name="description"
          label="Description"
          component={Textarea}
        />
        <Field
          name="role"
          label="Primary Role"
          component={Select}
        />
        <Field
          name="type"
          label="Job Type"
          component={Select}
        />
        <Field
          name="location"
          label="Locations"
          component={Select}
        />
        <Field
          name="remote"
          label="Remote"
          component={Select}
        />
        <Field
          name="salaryMin"
          label="Salary Min"
          component={Currency}
        />
        <Field
          name="salaryMax"
          label="Salary Max"
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
  auth: state.auth,
});

JobForm = reduxForm({
  form: 'job',
})(JobForm);

export default connect(mapStateToProps)(JobForm);