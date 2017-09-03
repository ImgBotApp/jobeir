import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Text, SubmitButton } from '../../../inputs/input';
import queryString from 'query-string';
import Autocomplete from '../../../autocomplete/Autocomplete';
import Select from 'react-select';
import { jobOptions } from '../../options/jobs';

const customStyles = {
  top: 'calc(100% + 8px)',
  left: '0'
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleInputContainerClick = this.handleInputContainerClick.bind(this);
  }

  handleInputContainerClick() {
    findDOMNode(this.nameInput).focus();
  }

  render() {
    const { meta, location } = this.props;
    const showError = meta.touched && meta.error && meta.invalid;

    return (
      <SearchInputContainer
        location={location}
        onClick={this.handleInputContainerClick}
      >
        <SearchLabel htmlFor={this.props.input.name}>
          {this.props.label} {meta.error}
        </SearchLabel>
        <SearchInput
          {...this.props.input}
          type={this.props.input.type || 'text'}
          id={this.props.input.name}
          name={this.props.input.name}
          placeholder={this.props.placeholder}
          showError={showError}
          autoFocus={this.props.autoFocus}
          autoComplete={false}
          ref={input => {
            this.nameInput = input;
          }}
        />
        {this.props.autocomplete &&
          <Autocomplete
            formName="search"
            types={['(cities)']}
            id={this.props.input.name}
            customStyles={customStyles}
          />}
      </SearchInputContainer>
    );
  }
}

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.handleInputContainerClick = this.handleInputContainerClick.bind(this);
  }

  handleInputContainerClick() {
    this.refs.stateSelect.focus();
  }

  render() {
    return (
      <SearchInputContainer onClick={this.handleInputContainerClick}>
        <SearchLabel htmlFor={this.props.input.name}>
          {this.props.label} {this.props.meta.error}
        </SearchLabel>
        <SelectContainer>
          <Select
            {...this.props.input}
            id={this.props.input.name}
            name={this.props.input.name}
            options={this.props.options}
            placeholder={this.props.placeholder}
            onBlur={() => {}}
            autoFocus={this.props.autoFocus}
            searchable={true}
            openOnFocus={true}
            ref="stateSelect"
          />
        </SelectContainer>
      </SearchInputContainer>
    );
  }
}

const Button = (props: {
  disabled: boolean,
  buttonText: string,
  location: string
}) =>
  <SearchButton
    type="submit"
    disabled={props.disabled}
    location={props.location}
  >
    {props.buttonText || 'Search'}
  </SearchButton>;

class SearchForm extends Component {
  componentDidMount() {
    /**
     * This is a hack to remove the browser's autocomplete suggestions
     * for the input fields in the search bar. If there's an id and
     * title attribute the browser will be able to show the suggestion
     * which covers our own autocomplete suggestions
     */
    this.location = document.getElementById('location');

    this.location.removeAttribute('name');
    this.location.removeAttribute('id');
  }

  componentWillUnmount() {
    // have to add them back before unmounting
    this.location.setAttribute('name', 'location');
    this.location.setAttribute('id', 'location');
  }

  formSubmit = data => {
    const queryData = {
      q: data.title && data.title.value,
      l: data.location,
      lat: data.lat || data.coordinates[0],
      lng: data.lng || data.coordinates[1]
    };
    const query = queryString.stringify(queryData);
    browserHistory.push(`/jobs?${query}`);
  };

  render() {
    const { handleSubmit, location } = this.props;

    return (
      <SearchFormContainer
        onSubmit={handleSubmit(this.formSubmit)}
        location={location}
      >
        <Field
          name="title"
          label="Job Title"
          component={SelectInput}
          options={jobOptions}
          location={location}
          autoFocus={true}
        />
        <Field
          name="location"
          label="Location"
          component={Input}
          location={location}
          autocomplete={true}
        />
        {location !== 'nav' &&
          <Field name="submitButton" component={Button} location={location} />}
      </SearchFormContainer>
    );
  }
}

SearchForm = reduxForm({
  form: 'search',
  destroyOnUnmount: false
})(SearchForm);

const mapStateToProps = state => ({
  initialValues: {
    location:
      state.location && `${state.location.city}, ${state.location.region}`,
    coordinates: state.location.ll
  }
});

export default connect(mapStateToProps)(SearchForm);

const SearchFormContainer = styled.form`
  display: flex;
  width: ${props => (props.location === 'nav' ? '820px' : '100%')};
  background: #fff;
  border: ${props => (props.location === 'nav' ? 'none' : '1px solid #dce0e0')};
  box-shadow: ${props =>
    props.location === 'nav' ? 'none' : '0 1px 3px 0 #dce0e0'};
  border-radius: 4px;
  height: ${props => (props.location === 'nav' ? '75px' : '80px')};
  margin-top: ${props => (props.location === 'nav' ? '0px' : '30px')};
`;

const SearchInput = styled.input`
  position: relative;
  top: -1px;
  border: 0;
  height: 100%;
  font-weight: 800;
  padding-top: 5px;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const SearchLabel = styled.label`
  margin-top: 15px;
  font-size: 17px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 15px 15px;

  &:first-child {
    margin-right: 0;
    padding-right: 15px;
    border-right: 1px solid #dce0e0;
    border-left: ${props =>
      props.location === 'nav' ? '1px solid #dce0e0' : 'none'};
  }
`;

const SearchButton = styled.button`
  width: 160px;
  font-size: 18px;
  color: white;
  background-color: #5c6ac4;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  margin: 15px;
  margin-left: 0;
`;

const AutocompleteContainer = styled.div`position: relative;`;

const SelectContainer = styled.div`
  .Select {
    position: relative;
    top: -1px;
    padding-top: 5px;
  }

  .Select,
  .Select div,
  .Select input,
  .Select span {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .Select.is-disabled > .Select-control {
    background-color: #f9f9f9;
  }
  .Select.is-disabled > .Select-control:hover {
    box-shadow: none;
  }
  .Select.is-disabled .Select-arrow-zone {
    cursor: default;
    pointer-events: none;
    opacity: 0.35;
  }
  .Select-control {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
    cursor: default;
    display: table;
    border-spacing: 0;
    border-collapse: separate;
    height: 28px;
    overflow: hidden;
    position: relative;
    width: 100%;
    font-size: 20px;
    font-weight: 800;
    width: 100%;
    margin: 0 auto;
  }
  .Select-control .Select-input:focus {
  }
  .is-searchable.is-open > .Select-control {
    cursor: text;
  }
  .is-open > .Select-control {
    background: #fff;
    border-color: ${props =>
      props.showError ? props.theme.error.color : props.theme.colors.text};
  }
  .is-open > .Select-control .Select-arrow {
    top: -2px;
    border-color: transparent transparent #676767;
    border-width: 0 5px 5px;
  }
  .is-searchable.is-focused:not(.is-open) > .Select-control {
    cursor: text;
  }

  .Select-placeholder {
    display: flex;
    align-items: center;
  }

  .Select-placeholder,
  .Select--single > .Select-control .Select-value {
    display: flex;
    align-items: center;
    bottom: 0;
    color: #fff;
    left: 0;
    line-height: 1.5;
    padding-left: 0;
    padding-right: 18px;
    position: absolute;
    right: 0;
    top: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .has-value.Select--single > .Select-control .Select-value .Select-value-label,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control .Select-value .Select-value-label {
    font-weight: 800;
    color: rgba(0, 0, 0, 0.85);
  }
  .has-value.Select--single
    > .Select-control .Select-value a.Select-value-label,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control .Select-value a.Select-value-label {
    cursor: pointer;
    text-decoration: none;
  }
  .has-value.Select--single
    > .Select-control .Select-value a.Select-value-label:hover,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control .Select-value a.Select-value-label:hover,
  .has-value.Select--single
    > .Select-control .Select-value a.Select-value-label:focus,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control .Select-value a.Select-value-label:focus {
    color: #007eff;
    outline: none;
    text-decoration: underline;
  }
  .Select-input {
    height: 20px;
    vertical-align: middle;
  }
  .Select-input > input {
    position: relative;
    top: -9px;
    width: 100%;
    background: none transparent;
    border: 0 none;
    box-shadow: none;
    cursor: default;
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    outline: none;
    line-height: 14px;

    /* For IE 8 compatibility */
    padding: 8px 0 12px;
    /* For IE 8 compatibility */
    -webkit-appearance: none;
  }
  .is-focused .Select-input > input {
    cursor: text;
  }
  .has-value.is-pseudo-focused .Select-input {
    opacity: 0;
  }
  .Select-control:not(.is-searchable) > .Select-input {
    outline: none;
  }
  .Select-loading-zone {
    cursor: pointer;
    display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 16px;
  }
  .Select-loading {
    -webkit-animation: Select-animation-spin 400ms infinite linear;
    -o-animation: Select-animation-spin 400ms infinite linear;
    animation: Select-animation-spin 400ms infinite linear;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-right-color: rgba(0, 0, 0, 0.85);
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  .Select-clear-zone {
    display: none;
    -webkit-animation: Select-animation-fadeIn 200ms;
    -o-animation: Select-animation-fadeIn 200ms;
    animation: Select-animation-fadeIn 200ms;
    color: #676767;
    cursor: pointer;
    // display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 17px;
  }
  .Select-clear-zone:hover {
    color: #d0021b;
  }
  .Select-clear {
    display: inline-block;
    font-size: 18px;
    line-height: 1;
  }
  .Select--multi .Select-clear-zone {
    width: 17px;
  }
  .Select-arrow-zone {
    display: none;
    cursor: pointer;
    // display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 25px;
    padding-right: 5px;
  }
  .Select-arrow {
    border-color: #676767 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 2.5px;
    display: inline-block;
    height: 0;
    width: 0;
    position: relative;
  }
  .is-open .Select-arrow,
  .Select-arrow-zone:hover > .Select-arrow {
    border-top-color: #666;
  }
  .Select--multi .Select-multi-value-wrapper {
    display: inline-block;
  }
  .Select .Select-aria-only {
    display: inline-block;
    height: 1px;
    width: 1px;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    float: left;
  }
  @-webkit-keyframes Select-animation-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes Select-animation-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .Select-menu-outer {
    background-color: #fff;
    border-top-color: #e6e6e6;
    border-radius: 3px;
    z-index: 1;
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
      0 8px 16px rgba(27, 39, 51, 0.08);
    box-sizing: border-box;
    margin-top: 19px;
    max-height: 250px;
    position: absolute;
    left: -15px;
    top: 100%;
    width: 362px;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
  }
  .Select-menu {
    max-height: 198px;
    overflow-y: auto;
  }
  .Select-option {
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    display: block;
    padding: 16px 18px;
    border-bottom: 1px solid #e8e8e8;
  }
  .Select-option:last-child {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .Select-option.is-selected {
    /* Fallback color for IE 8 */
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.85);
  }
  .Select-option.is-focused {
    /* Fallback color for IE 8 */
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.85);
  }
  .Select-option.is-disabled {
    color: #cccccc;
    cursor: default;
  }
  .Select-noresults {
    box-sizing: border-box;
    color: #676767;
    cursor: default;
    display: block;
    padding: 8px 10px;
  }
  .Select--multi .Select-input {
    vertical-align: middle;
    margin-left: 10px;
    padding: 0;
  }
  .Select--multi.has-value .Select-input {
    margin-left: 5px;
  }
  .Select--multi .Select-value {
    background-color: #ebf5ff;
    /* Fallback color for IE 8 */
    background-color: rgba(0, 126, 255, 0.08);
    border-radius: 2px;
    border: 1px solid #c2e0ff;
    /* Fallback color for IE 8 */
    border: 1px solid rgba(0, 126, 255, 0.24);
    color: #007eff;
    display: inline-block;
    font-size: 0.9em;
    line-height: 1.5;
    margin-left: 5px;
    margin-top: 5px;
    vertical-align: top;
  }
  .Select--multi .Select-value-icon,
  .Select--multi .Select-value-label {
    display: inline-block;
    vertical-align: middle;
  }
  .Select--multi .Select-value-label {
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    cursor: default;
    padding: 2px 5px;
  }
  .Select--multi a.Select-value-label {
    color: #007eff;
    cursor: pointer;
    text-decoration: none;
  }
  .Select--multi a.Select-value-label:hover {
    text-decoration: underline;
  }
  .Select--multi .Select-value-icon {
    cursor: pointer;
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    border-right: 1px solid #c2e0ff;
    /* Fallback color for IE 8 */
    border-right: 1px solid rgba(0, 126, 255, 0.24);
    padding: 1px 5px 3px;
  }
  .Select--multi.is-disabled .Select-value {
    background-color: #fcfcfc;
    border: 1px solid #e3e3e3;
    color: rgba(0, 0, 0, 0.85);
  }
  .Select--multi.is-disabled .Select-value-icon {
    cursor: not-allowed;
    border-right: 1px solid #e3e3e3;
  }
  .Select--multi.is-disabled .Select-value-icon:hover,
  .Select--multi.is-disabled .Select-value-icon:focus,
  .Select--multi.is-disabled .Select-value-icon:active {
    background-color: #fcfcfc;
  }
  @keyframes Select-animation-spin {
    to {
      transform: rotate(1turn);
    }
  }
  @-webkit-keyframes Select-animation-spin {
    to {
      -webkit-transform: rotate(1turn);
    }
  }
`;
