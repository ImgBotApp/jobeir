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
  SubmitButton,
} from '../../../inputs/input';
import { required } from '../../../validation';
import { createJob } from '../../../../create/job/ducks';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);
const equityOptions = [
  { text: 'Yes', value: 'Yes' },
  { text: 'No', value: 'No' },
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
    const { handleSubmit, job, offersEquity, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={job.errors}
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
          label="Do you offer equity?"
          validate={[required]}
          options={equityOptions}
          component={Radio}
        />
        {offersEquity === 'Yes' &&
          <FormRow>
            <Field
              name="equityMin"
              label="Equity minimum"
              placeholder="$"
              validate={[required]}
              parse={parseNumber}
              component={Currency}
            />
            <Field
              name="equityMax"
              label="Equity maximum"
              placeholder="$"
              validate={[required]}
              parse={parseNumber}
              component={Currency}
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
  job: state.job,
  auth: state.session.auth,
  offersEquity: selector(state, 'offerEquity'),
  initialValues: {
    equityMin: 0,
    equityMax: 0,
  },
});

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);
