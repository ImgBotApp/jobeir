import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Field,
  FieldArray,
  formValueSelector,
  reduxForm,
  change,
  arrayPush
} from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, SubmitButton, Text } from '../../../inputs/input';
import { required } from '../../../validation';
import { createCompany } from '../../../../create/company/ducks';
import CompanyFormLocationEdit from './CompanyFormLocationEdit';
import Autocomplete from '../../../autocomplete/Autocomplete';

class CompanyFormStepThree extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.dispatch(createCompany(data, '/create/company/upload'));
  }

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
            label="Start typing full address"
            component={Text}
            autocomplete={false}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          <Autocomplete id="fullAddress" />
        </AutocompleteContainer>
        {locations.length > 0 &&
          <MultipleLocations>
            Have more than one office? Just type in another address to add it.
          </MultipleLocations>}
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
`;

const AutocompleteContainer = styled.div`position: relative;`;

const InputGoogleAutocompleteList = styled.ul`
  opacity: ${props =>
    (props.active && props.show) || props.isSearching ? 1 : 0};
  position: absolute;
  background: #fff;
  width: 100%;
  top: calc(100% - 4px);
  border-radius: 3px;
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
`;

const InputGoogleAutocompleteLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  text-align: center;

  img {
    height: 18px;
  }
`;

const InputGoogleAutocompleteSearching = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  color: #7e7c7c;
`;
