import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormRow from '../../components/FormRow';
import FormFooter from '../../components/FormFooter';
import {
  BackButton,
  Currency,
  Text,
  Radio,
  SubmitButton
} from '../../../inputs/input';
import { required } from '../../../validation';
import { createJob } from '../../../../create/job/ducks';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);
const parsePercentage = value => value / 100;
const formatPercentage = value => value * 100 + '%';
const yesNoOptions = [
  { text: 'Yes', value: 'Yes' },
  { text: 'No', value: 'No' }
];

class JobFormComponesation extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.nextPage();
  }

  render() {
    const { handleSubmit, jobs, offersEquity, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <FormHeader text="What's the compensation?" />
        <FormRow>
          <Field
            name="salaryMin"
            label="Salary minimum"
            placeholder="$"
            validate={[required]}
            parse={parseNumber}
            component={Currency}
          />
          <Field
            name="salaryMax"
            label="Salary maximum"
            placeholder="$"
            validate={[required]}
            parse={parseNumber}
            component={Currency}
          />
        </FormRow>
        <Field
          name="offerEquity"
          label="Do you offer equity for this job?"
          validate={[required]}
          options={yesNoOptions}
          type="yes/no"
          component={Radio}
        />
        {offersEquity === 'Yes' &&
          <FormRow>
            <Field
              name="equityMin"
              label="Equity minimum"
              type="number"
              placeholder="%"
              validate={[required]}
              format={formatPercentage}
              parse={parsePercentage}
              component={Text}
            />
            <Field
              name="equityMax"
              label="Equity maximum"
              type="number"
              placeholder="%"
              validate={[required]}
              format={formatPercentage}
              parse={parsePercentage}
              component={Text}
            />
          </FormRow>}
        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('job');

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.session.auth,
  offersEquity: selector(state, 'offerEquity')
});

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);
