import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, reduxForm, initialize } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, Text, Select, SubmitButton } from '../../../inputs/input';
import { email, required } from '../../../validation';
import { createJob } from '../../../../create/job/ducks';

const renderEmailFields = ({
  fields,
  meta: { touched, error, submitFailed },
}) => (
  <FormListWrapper>
    {fields.map(renderFields)}
    <FormListButton onClick={() => fields.push({})}>
      Add additional email
    </FormListButton>
  </FormListWrapper>
);

const renderFields = (member, index, fields) => (
  <FormListItem key={member}>
    <Field
      name={`${member}.email`}
      label={`${index === 0 ? 'Send applications to the following emails:' : ''}`}
      validate={[email, required]}
      component={Text}
    />
  </FormListItem>
);

class JobFormComponesation extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;

    dispatch(initialize('job', { receivingEmails: [{ email: user.email }] }));
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
        <FormHeader text="Receiving applications" />
        <FieldArray name="receivingEmails" component={renderEmailFields} />
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
  user: state.session.user,
});

JobFormComponesation = reduxForm({
  form: 'job',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    receivingEmails: [{}],
  },
})(JobFormComponesation);

export default connect(mapStateToProps)(JobFormComponesation);

const FormListWrapper = styled.div`
  padding-top: 1rem;
`;

const FormListItem = styled.div`
  margin-top: -1rem;
`;

const FormListButton = styled.div`
  position: relative;
  cursor: pointer;
  color: ${props => props.theme.colors.red};
  text-decoration: underline;
  padding-left: 30px;

  &::before {
    content: '+';
    position: absolute;
    left: 0;
    top: -3px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.red};
    height: 16px;
    width: 15px;
    display: flex;
    padding: 2px 0 2px 5px;
    text-align: center;
  }
`;
