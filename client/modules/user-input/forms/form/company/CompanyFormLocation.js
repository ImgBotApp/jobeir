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
import debounce from 'lodash/debounce';

import InputGoogleAutocomplete from '../../../inputs/components/InputGoogleAutocomplete';

class CompanyFormStepThree extends Component {
  constructor(props) {
    super(props);

    this.state = { predictions: [], isSearching: false, show: false };
    this.formSubmit = this.formSubmit.bind(this);
    this.getDetailsByPlaceId = this.getDetailsByPlaceId.bind(this);
    this.handlePlaceDetails = this.handlePlaceDetails.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const addressInput = document.getElementById('fullAddress');

    const displaySuggestions = (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }

      this.setState({ predictions, isSearching: !this.state.isSearching });
    };

    const debounced = debounce(function(input) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input }, displaySuggestions);
    }, 450).bind(this);

    function handleTyping(event) {
      const inputValue = event.target.value;

      if (!this.state.isSearching) {
        this.setState({ isSearching: true });
      }

      if (inputValue) {
        debounced(inputValue);
      }
    }

    addressInput.addEventListener('input', handleTyping.bind(this));
  }

  getDetailsByPlaceId(placeId) {
    const emptyDiv = document.createElement('div');
    const service = new google.maps.places.PlacesService(emptyDiv);

    service.getDetails({ placeId }, this.handlePlaceDetails);
  }

  handlePlaceDetails(place, status) {
    const { dispatch } = this.props;

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

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
      this.setState({ predictions: [] });
    }
  }

  handleBlur() {
    this.setState({ show: false });
  }

  handleFocus() {
    this.setState({ show: true });
  }

  formSubmit(data) {
    this.props.dispatch(createCompany(data, '/create/company/upload'));
  }

  render() {
    const { companies, handleSubmit, locations, prevPage } = this.props;
    const { isSearching, show, predictions } = this.state;

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
          <InputGoogleAutocompleteList
            active={predictions.length}
            isSearching={isSearching}
            show={show}
          >
            {isSearching
              ? <InputGoogleAutocompleteSearching>
                  Searching Address...
                </InputGoogleAutocompleteSearching>
              : <div>
                  {predictions.map(prediction => {
                    return (
                      <InputGoogleAutocomplete
                        key={prediction.id}
                        prediction={prediction}
                        fetchPlaceId={() =>
                          this.getDetailsByPlaceId(prediction.place_id)}
                      />
                    );
                  })}
                </div>}
            <InputGoogleAutocompleteLogo>
              <img
                src="/public/static/google/powered_by_google_on_white_hdpi.png"
                alt="powered by Google logo"
              />
            </InputGoogleAutocompleteLogo>
          </InputGoogleAutocompleteList>
        </AutocompleteContainer>
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
