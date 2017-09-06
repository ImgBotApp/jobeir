// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { change, arrayPush } from 'redux-form';
import debounce from 'lodash/debounce';
import AutocompleteResult from './AutocompleteResult';
import AutocompleteLogo from './AutocompleteLogo';

class Autocomplete extends Component {
  state: {
    predictions: Array<{}>,
    isSearching: boolean,
    show: boolean,
    selectedIndex: number
  };

  constructor(props) {
    super(props);

    this.state = {
      predictions: [],
      isSearching: false,
      noResults: false,
      show: false,
      selectedIndex: 0
    };

    this.debouncedSearch = debounce(function(input) {
      const service = new google.maps.places.AutocompleteService();
      const { types } = this.props;

      service.getPlacePredictions({ input, types }, this.displaySuggestions);
    }, 500).bind(this);
  }

  componentDidMount() {
    const inputField: HTMLElement = document.getElementById(this.props.id);

    inputField.addEventListener('focus', this.handleFocus);
    inputField.addEventListener('blur', this.handleBlur);
    inputField.addEventListener('keyup', this.handleTyping);
  }

  componentWillUnmount() {
    const inputField: HTMLElement = document.getElementById(this.props.id);

    inputField.removeEventListener('focus', this.handleFocus);
    inputField.removeEventListener('blur', this.handleBlur);
    inputField.removeEventListener('keyup', this.handleTyping);
  }

  getDetailsByPlaceId = (placeId: string) => {
    const emptyDiv = document.createElement('div');
    const service = new google.maps.places.PlacesService(emptyDiv);

    service.getDetails({ placeId }, this.handlePlaceDetails);
  };

  handleTyping = (event: {
    preventDefault: Function,
    which: number,
    target: { value: string }
  }) => {
    const { isSearching, predictions, selectedIndex } = this.state;
    const lastResult: number = predictions.length - 1;
    const inputValue: string = event.target.value;
    const upArrow: boolean = event.which === 38;
    const downARrow: boolean = event.which === 40;
    const enter: boolean = event.which === 13;

    this.setState({ noResults: false });

    // move the selected list item up
    if (upArrow) {
      // go to the bottom if first item and press up arrow
      if (selectedIndex === 0) {
        return this.setState({ selectedIndex: lastResult });
      }
      return this.setState({ selectedIndex: selectedIndex - 1 });
    }

    // move the selected list item down
    if (downARrow) {
      // go back to the top if at the last item and press down arrow
      if (selectedIndex === lastResult) {
        return this.setState({ selectedIndex: 0 });
      }
      return this.setState({ selectedIndex: selectedIndex + 1 });
    }

    // enter key = fetch place data
    if (enter) {
      this.getDetailsByPlaceId(predictions[selectedIndex].place_id);
      return event.preventDefault();
    }

    if (!isSearching) {
      this.setState({ isSearching: true });
    }

    if (inputValue) {
      this.debouncedSearch(inputValue);
    }
  };

  displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      // This should be changed from an alert
      return this.setState({ noResults: true });
    }

    this.setState({ predictions, isSearching: !this.state.isSearching });
  };

  handlePlaceDetails = (
    place: {
      address: { address_components: Array<string> },
      geometry: { location: { lat: Function, lng: Function } }
    },
    status: string
  ) => {
    const { dispatch, formName } = this.props;

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const lat = place.geometry.location.lat().toFixed(2);
      const lng = place.geometry.location.lng().toFixed(2);

      const componentForm: {} = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        administrative_area_level_2: 'long_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      const location: { address: {}, coordinates: Array<number> } = {
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

      if (formName === 'search') {
        dispatch(change('search', 'lng', location.coordinates[0]));
        dispatch(change('search', 'lat', location.coordinates[1]));
        dispatch(
          change(
            'search',
            'location',
            `${location.address.locality}, ${location.address
              .short_administrative_area_level_1}`
          )
        );
      } else {
        dispatch(change('company', 'fullAddress', ''));
        dispatch(arrayPush('company', 'locations', location));
      }
    }

    this.setState({ predictions: [] });
  };

  handleBlur = () => {
    this.setState({ show: false });
  };

  handleFocus = () => {
    this.setState({ show: true });
  };

  render() {
    const {
      isSearching,
      noResults,
      show,
      predictions,
      selectedIndex
    } = this.state;

    return (
      <AutocompleteList
        active={predictions.length}
        isSearching={isSearching}
        show={show}
        style={this.props.customStyles}
      >
        {isSearching
          ? <AutocompleteSearching>
              {noResults
                ? 'No address found. Try a different address.'
                : 'Searching Address...'}
            </AutocompleteSearching>
          : <div>
              {predictions.map((prediction, index) =>
                <AutocompleteResult
                  key={prediction.id}
                  prediction={prediction}
                  selected={selectedIndex === index}
                  fetchPlaceId={() =>
                    this.getDetailsByPlaceId(prediction.place_id)}
                />
              )}
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
