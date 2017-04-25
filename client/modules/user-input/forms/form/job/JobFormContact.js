import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, Text, Select, SubmitButton } from '../../../inputs/input';
import { required } from '../../../validation';
import { createJob } from '../../../../create/job/ducks';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);

class JobFormComponesation extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { dispatch, company } = this.props;
    // adding the company to the data;
    const body = { ...data, company };

    dispatch(createJob(body));
  }

  render() {
    const { handleSubmit, job, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={job.errors}
        theme="marble"
      >
        <FormHeader text="How would you like to receive applications?" />
        <Field
          name="salaryMin"
          label="Salary Min"
          validate={[required]}
          parse={parseNumber}
          component={Text}
        />
        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Create"
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  job: state.job,
  auth: state.session.auth,
  company: state.session.user.companies.created[0].name,
});

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);
