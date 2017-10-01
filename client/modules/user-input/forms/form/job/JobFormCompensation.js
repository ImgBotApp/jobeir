// @flow
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
  Percentage,
  Radio,
  SubmitButton
} from '../../../inputs/input';
import { required } from '../../../validation';
import { yesNoOptions } from '../../../options';
import { parseNumber } from '../../../parse';

class JobFormComponesation extends Component {
  formSubmit = (): void => {
    this.props.nextPage();
  };

  render() {
    const { handleSubmit, jobs, equity, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <FormHeader text="What's the compensation?" />
        <FormRow alwaysRow={true}>
          <Field
            name="salary.min"
            label="Salary minimum"
            placeholder="$"
            validate={[required]}
            parse={parseNumber}
            component={Currency}
          />
          <Field
            name="salary.max"
            label="Salary maximum"
            placeholder="$"
            validate={[required]}
            parse={parseNumber}
            component={Currency}
          />
        </FormRow>
        <Field
          name="equity.offer"
          label="Do you offer equity for this job?"
          validate={[required]}
          options={yesNoOptions}
          type="yes/no"
          component={Radio}
        />
        {equity &&
          equity.offer === 'Yes' && (
            <FormRow alwaysRow={true}>
              <Field
                name="equity.min"
                label="Equity minimum"
                type="number"
                placeholder="0.1%"
                validate={[required]}
                component={Percentage}
              />
              <Field
                name="equity.max"
                label="Equity maximum"
                type="number"
                placeholder="3%"
                validate={[required]}
                component={Percentage}
              />
            </FormRow>
          )}
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
  jobs: state.account.jobs,
  auth: state.session.auth,
  equity: selector(state, 'equity')
});

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);
