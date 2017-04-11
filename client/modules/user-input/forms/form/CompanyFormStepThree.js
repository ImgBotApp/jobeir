import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';
import {
  BackButton,
  SubmitButton,
  Text,
} from '../../inputs/input';
import { required } from '../../validation';
import { createCompany } from '../../../create/company/ducks'

class CompanyFormStepThree extends Component {
  constructor(props) {
     super(props);
     
     this.formSubmit = this.formSubmit.bind(this);
   }

   formSubmit(data) {
    const { dispatch, id } = this.props;
    // adding the user id to the data;
    const body = { ...data, id };
    
    dispatch(createCompany(data))
   }

  render() {
    const {
      company,
      handleSubmit,
      previousPage,
    } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader
          text="Where is your office located?"
        />
        <Field
          name="location"
          label="Location"
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
          name="location"
          label="Location"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="location"
          label="Location"
          validate={[ required ]}
          component={Text}
        />
        <FormFooter>
          <BackButton
            action={previousPage}
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
  company: state.company,
  id: state.session.user._id,
});

CompanyFormStepThree = reduxForm({
  form: 'company',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(CompanyFormStepThree);

export default connect(mapStateToProps)(CompanyFormStepThree);