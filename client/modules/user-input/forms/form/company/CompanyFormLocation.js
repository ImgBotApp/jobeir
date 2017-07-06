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

class CompanyFormStepThree extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const addressInput = document.getElementById('fullAddress');
    const autocomplete = new google.maps.places.Autocomplete(addressInput);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log(place);

      const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        administrative_area_level_2: 'long_name',
        country: 'long_name',
        country: 'short_name',
        postal_code: 'short_name'
      };

      const location = {
        address: {
          unit: '',
          street_number: '',
          route: '',
          locality: '',
          administrative_area_level_1: '',
          administrative_area_level_2: '',
          short_administrative_area_level_1: '',
          country: '',
          postal_code: ''
        },
        coordinates: [lng, lat]
      };

      for (let i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];

        if (addressType === 'administrative_area_level_1') {
          const val = place.address_components[i].short_name;
          location.address.short_administrative_area_level_1 = val;
        }

        if (componentForm[addressType]) {
          const val = place.address_components[i][componentForm[addressType]];
          location.address[addressType] = val;
        }
      }

      dispatch(change('company', 'fullAddress', ''));
      dispatch(arrayPush('company', 'locations', location));
    });
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
        <Field
          name="fullAddress"
          label="Start typing full address"
          component={Text}
        />
        {locations.length === 1 &&
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
  companies: state.companies,
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
