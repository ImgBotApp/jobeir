import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { change, arrayPush } from 'redux-form';
import debounce from 'lodash/debounce';
import AutocompleteResult from './AutocompleteResult';
import AutocompleteLogo from './AutocompleteLogo';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = { predictions: [], isSearching: false, show: false };

    this.debouncedSerach = debounce(function(input) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input }, this.displaySuggestions);
    }, 500).bind(this);

    this.handleTyping = this.handleTyping.bind(this);
    this.getDetailsByPlaceId = this.getDetailsByPlaceId.bind(this);
    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.handlePlaceDetails = this.handlePlaceDetails.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    const inputField = document.getElementById(this.props.id);

    inputField.addEventListener('focus', this.handleFocus);
    inputField.addEventListener('blur', this.handleBlur);
    inputField.addEventListener('input', this.handleTyping);
  }

  componentWillUnmount() {
    const inputField = document.getElementById(this.props.id);

    inputField.removeEventListener('focus', this.handleFocus);
    inputField.removeEventListener('blur', this.handleBlur);
    inputField.removeEventListener('input', this.handleTyping);
  }

  handleTyping(event) {
    const inputValue = event.target.value;

    if (!this.state.isSearching) {
      this.setState({ isSearching: true });
    }

    if (inputValue) {
      this.debouncedSerach(inputValue);
    }
  }

  getDetailsByPlaceId(placeId) {
    const emptyDiv = document.createElement('div');
    const service = new google.maps.places.PlacesService(emptyDiv);

    service.getDetails({ placeId }, this.handlePlaceDetails);
  }

  displaySuggestions(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }

    this.setState({ predictions, isSearching: !this.state.isSearching });
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

  render() {
    const { isSearching, show, predictions } = this.state;

    return (
      <AutocompleteList
        active={predictions.length}
        isSearching={isSearching}
        show={show}
      >
        {isSearching
          ? <AutocompleteSearching>Searching Address...</AutocompleteSearching>
          : <div>
              {predictions.map(prediction => {
                return (
                  <AutocompleteResult
                    key={prediction.id}
                    prediction={prediction}
                    fetchPlaceId={() =>
                      this.getDetailsByPlaceId(prediction.place_id)}
                  />
                );
              })}
            </div>}
        <AutocompleteLogo />
      </AutocompleteList>
    );
  }
}

export default connect()(Autocomplete);

const AutocompleteList = styled.ul`
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

const AutocompleteSearching = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  color: #7e7c7c;
`;
