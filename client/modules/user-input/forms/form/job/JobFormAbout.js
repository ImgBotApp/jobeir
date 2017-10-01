// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { required, wysiwygLength } from '../../../validation';
import {
  SelectSearch,
  Text,
  Wysiwyg,
  SubmitButton
} from '../../../inputs/input';
import { jobOptions } from '../../../options/';

class JobFormabout extends Component {
  formSubmit = (): void => {
    this.props.nextPage();
  };

  render() {
    const { activeCompany, handleSubmit, jobs } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <FormHeader text={`Create a job at ${activeCompany.displayName}`} />
        <Field
          name="title"
          label="What's the job title?"
          placeholder="Senior Product Designer, Backend Engineer"
          validate={[required]}
          component={Text}
        />
        <Field
          name="role"
          label="What's the main role of this position?"
          placeholder="Search roles"
          validate={[required]}
          options={jobOptions}
          component={SelectSearch}
        />
        <div style={{ paddingBottom: '1rem' }} />
        <Field
          label="Describe the role and requirements"
          name="description"
          ui={{ maxWidth: '100%' }}
          validate={[required, wysiwygLength(25)]}
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
}

const mapStateToProps = state => ({
  jobs: state.account.jobs,
  activeCompany: state.account.companies.activeCompany
});

JobFormabout = reduxForm({
  form: 'job',
  destroyOnUnmount: false
})(JobFormabout);

export default connect(mapStateToProps)(JobFormabout);
