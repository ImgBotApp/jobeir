import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormRow from '../../components/FormRow';
import FormFooter from '../../components/FormFooter';
import {
  BackButton,
  Checkbox,
  Currency,
  Phone,
  Text,
  Select,
  Textarea,
  SubmitButton
} from '../../../inputs/input';
import {
  required,
} from '../../../validation';
import { createJob } from '../../../../create/job/ducks';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);

class JobFormComponesation extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.nextPage();
  }

  render() {
    const {
      handleSubmit,
      job,
      prevPage,
    } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={job.errors}
        theme="marble"
      >
        <FormHeader
          text="What's the compensation?"
        />
        <FormRow>
          <Field
            name="salaryMin"
            label="Salary minimum"
            validate={[ required ]}
            parse={parseNumber}
            component={Currency}
          />
          <Field
            name="salaryMax"
            label="Salary maximum"
            validate={[ required ]}
            parse={parseNumber}
            component={Currency}
          />
        </FormRow>
        <FormFooter>
          <BackButton
            action={prevPage}
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

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);