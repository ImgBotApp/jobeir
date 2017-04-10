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

class JobFormStepThree extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.dispatch(createJob(data))
  }

  render() {
    const { handleSubmit, job } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={job.errors}
        theme="marble"
      >
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
        <button type="button" className="previous" onClick={this.props.previousPage}>back</button>
        <Field
          name="submitButton"
          buttonText="Creat Job"
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

JobFormStepThree = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(JobFormStepThree);

export default connect(mapStateToProps)(JobFormStepThree);