import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Text,
  Textarea,
  SubmitButton
} from '../../inputs/input';
import {
  required,
} from '../../validation';

class JobFormStepOne extends Component {
  constructor(props) {
     super(props);
     
     this.formSubmit = this.formSubmit.bind(this);
   }

  formSubmit() {
    this.props.nextPage();
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
});

JobFormStepOne = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(JobFormStepOne);

export default connect(mapStateToProps)(JobFormStepOne);