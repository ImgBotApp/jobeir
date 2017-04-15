import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import {
  required,
  wysiwygLength,
} from '../../../validation';
import {
  SelectSearch,
  Wysiwyg,
  SubmitButton
} from '../../../inputs/input';
import { jobOptions } from '../../options/jobs';

class JobFormabout extends Component {
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
          placeholder="Enter title"
          validate={[ required ]}
          options={jobOptions}
          component={SelectSearch}
        />
        <Field
          label="Describe the role"
          name="description"
          ui={{ maxWidth: '100%' }}
          validate={[ required, wysiwygLength(25) ]}
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

JobFormabout = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(JobFormabout);

export default connect(mapStateToProps)(JobFormabout);