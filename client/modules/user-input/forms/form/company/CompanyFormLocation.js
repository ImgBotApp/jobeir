// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, SubmitButton, Text } from '../../../inputs/input';
import { createCompany } from '../../../../account/create/company/ducks';
import CompanyFormLocationEdit from './CompanyFormLocationEdit';
import Autocomplete from '../../../autocomplete/Autocomplete';

class CompanyFormStepThree extends Component {
  formSubmit = (data: {}): void => {
    this.props.dispatch(createCompany(data, '/create/company/upload'));
  };

  render() {
    const { companies, handleSubmit, locations, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="marble"
      >
        <FormHeader text="Where's your office located?" />
        <AutocompleteContainer>
          <Field
            name="fullAddress"
            label={
              <div>
                <span>Start typing full address</span>
                <span
                  style={{ opacity: 0.4, display: 'block', margin: '7px 0' }}
                >
                  The address you enter is used when creating jobs
                </span>
              </div>
            }
            placeholder="123 Main Street"
            component={Text}
            autocomplete={false}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          <Autocomplete id="fullAddress" />
        </AutocompleteContainer>
        <MultipleLocations>
          Have more than one office? You can search and enter as many locations
          as you need.
        </MultipleLocations>
        <FieldArray
          name="locations"
          locations={locations}
          component={CompanyFormLocationEdit}
        />
        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Next"
            disabled={locations.length === 0}
            isSubmitting={companies.isCreating}
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('company');

const mapStateToProps = state => ({
  companies: state.account.companies,
  locations: selector(state, 'locations') || []
});

CompanyFormStepThree = reduxForm({
  form: 'company',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CompanyFormStepThree);

export default connect(mapStateToProps)(CompanyFormStepThree);

const MultipleLocations = styled.h3`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.6;
`;

const AutocompleteContainer = styled.div`position: relative;`;
