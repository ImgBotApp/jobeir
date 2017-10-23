// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, Text, SubmitButton } from '../../../inputs/input';
import { email, required, url } from '../../../validation';
import { createJob } from '../../../../account/create/job/ducks';
import { FormListRemoveIcon } from '../../../../../icons/';

const renderFields = (member: string, index: number, fields: Array<{}>) => (
  <FormListItem key={member}>
    {index > 0 && (
      <FormListRemoveItem onClick={() => fields.remove(index)}>
        <FormListRemoveIcon />
      </FormListRemoveItem>
    )}
    <Field
      name={`${member}.email`}
      label={`${index === 0
        ? 'Send applications to the following emails:'
        : ''}`}
      validate={[email, required]}
      component={Text}
    />
  </FormListItem>
);

const renderEmailFields = (props: { fields: Array<{}> }) => {
  const { fields } = props;

  return (
    <FormListWrapper>
      {fields.map(renderFields)}
      <FormListButton onClick={() => fields.push({})}>
        Add additional email
      </FormListButton>
    </FormListWrapper>
  );
};

class JobFormComponesation extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;

    dispatch(change('job', 'receivingEmails', [{ email: user.email }]));
  }

  formSubmit = (data: { address: string }): void => {
    const { dispatch, params: { companyId } } = this.props;
    // adding the company to the data;
    const location: {} = JSON.parse(data.address);
    const body: {} = { ...data, location };

    dispatch(createJob(companyId, body, '/account/jobs'));
  };

  render() {
    const { handleSubmit, jobs, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <FormHeader text="Receiving applications" />
        <Field
          name="externalLink"
          label="Is there a URL you'd like to link to?"
          placeholder="https://example.com/careers/job-posting"
          validate={[required, url]}
          component={Text}
        />
        <FieldArray name="receivingEmails" component={renderEmailFields} />
        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Create"
            component={SubmitButton}
            isSubmitting={jobs.isCreating}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.account.jobs,
  auth: state.session.auth,
  user: state.session.user
});

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);

const FormListWrapper = styled.div`padding-top: 1rem;`;

const FormListItem = styled.div`
  position: relative;
  margin-top: -1rem;
`;

const FormListRemoveItem = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.85);
  opacity: 0.5;
  border-radius: 50%;
  cursor: pointer;
`;

const FormListButton = styled.div`
  position: relative;
  cursor: pointer;
  color: ${props => props.theme.colors.purple};
  text-decoration: underline;
  padding-left: 30px;

  &::before {
    content: '+';
    position: absolute;
    left: 0;
    top: -3px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.purple};
    height: 16px;
    width: 15px;
    display: flex;
    padding: 2px 0 2px 5px;
    text-align: center;
  }
`;
