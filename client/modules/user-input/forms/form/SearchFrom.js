import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Text,
  SubmitButton
} from '../../inputs/input';
import {
  required,
} from '../../validation';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    console.log(data);
  }

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={[]}
      >
        <Field
          name="title"
          label="Job Title"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="location"
          label="Location"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="submitButton"
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
};

SearchForm = reduxForm({
  form: 'search',
})(SearchForm);

export default connect()(SearchForm);