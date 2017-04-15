import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { required } from '../../../validation';
import {
  Select,
  SubmitButton,
  Text,
  Textarea,
} from '../../../inputs/input';

const companySizeOptions = [
  { name: 'Select size', disabled: true, value: '' },
  { name: '1 - 9', value: '1 - 9' },
  { name: '10 - 49', value: '10 - 49' },
  { name: '50 - 149', value: '50 - 149' },
  { name: '150 - 499', value: '150 - 499' },
  { name: '500 - 999', value: '500 - 999' },
  { name: '1000 +', value: '1000 +' },
];

class CompanyFormStepOne extends Component {
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
      company
    } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader
          text="Tell us about your company"
        />
        <Field
          name="name"
          label="What's your company name?"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="companySize"
          label="How many employees work at your company?"
          validate={[ required ]}
          options={companySizeOptions}
          component={Select}
        />
        <Field
          name="product"
          label="Briefly describe your company"
          placeholder="Let applicants know what your company does and what it’s like to work there."
          validate={[ required ]}
          component={Textarea}
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
  company: state.company,
});

CompanyFormStepOne = reduxForm({
  form: 'company',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(CompanyFormStepOne);

export default connect(mapStateToProps)(CompanyFormStepOne);