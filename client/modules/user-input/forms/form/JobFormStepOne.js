import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';
import {
  required,
  wysiwygLength,
} from '../../validation';
import {
  Text,
  Wysiwyg,
  SubmitButton
} from '../../inputs/input';

class JobFormStepOne extends Component {
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
    } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={job.errors}
        theme="marble"
      >
        <FormHeader
          text="Create a job"
        />
        <Field
          name="title"
          label="What's the job title?"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="description"
          ui={{ maxWidth: '100%' }}
          validate={[ required, wysiwygLength(50) ]}
          component={Wysiwyg}
        />
        <FormFooter>
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
});

JobFormStepOne = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(JobFormStepOne);

export default connect(mapStateToProps)(JobFormStepOne);