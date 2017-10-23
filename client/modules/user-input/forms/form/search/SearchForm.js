import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm, change } from 'redux-form';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import { browserHistory } from 'react-router';
import queryString from 'query-string';
import Select from 'react-select';
import Autocomplete from '../../../autocomplete/Autocomplete';
import { jobOptions } from '../../../options';

const customStyles = {
  top: 'calc(100% + 6px)',
  left: '0'
};

class Input extends Component {
  handleInputContainerClick = () => {
    findDOMNode(this.nameInput).focus();
  };

  handleClearClick = () => {
    const { dispatch } = this.props.meta;
    dispatch(change('search', 'location', ''));
    dispatch(change('search', 'lat', ''));
    dispatch(change('search', 'lng', ''));
  };

  render() {
    const {
      autocomplete,
      placeholder,
      input,
      label,
      meta,
      location
    } = this.props;
    const showError = meta.touched && meta.error && meta.invalid;

    return (
      <SearchInputContainer
        location={location}
        onClick={this.handleInputContainerClick}
      >
        <SearchLabel htmlFor={input.name}>
          {label} {meta.error}
        </SearchLabel>
        <SearchInput
          {...input}
          type={input.type || 'text'}
          id={input.name}
          name={input.name}
          placeholder={placeholder}
          showError={showError}
          ref={inputNode => {
            this.nameInput = inputNode;
          }}
        />
        <SearchInputClear
          hasValue={input.value}
          onClick={this.handleClearClick}
        >
          ×
        </SearchInputClear>
        {autocomplete && (
          <Autocomplete
            formName="search"
            types={['(cities)']}
            id={input.name}
            customStyles={customStyles}
          />
        )}
      </SearchInputContainer>
    );
  }
}

class SelectInput extends Component {
  handleInputContainerClick = () => {
    this.refs.stateSelect.focus();
  };

  render() {
    const { input, meta, label, placeholder, options } = this.props;
    return (
      <SearchInputContainer onClick={this.handleInputContainerClick}>
        <SearchLabel htmlFor={input.name}>
          {label} {meta.error}
        </SearchLabel>
        <SelectContainer>
          <Select
            {...input}
            id={input.name}
            name={input.name}
            options={options}
            value={input.value.value}
            placeholder={placeholder}
            onBlur={() => {}}
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
}) => (
  <SearchButton
    type="submit"
    disabled={props.disabled}
    location={props.location}
  >
    {props.buttonText || 'Search'}
  </SearchButton>
);

class SearchForm extends Component {
  formSubmit = data => {
    const queryData = {
      q: data.title && data.title.value,
      l: data.location,
      lat: data.lat || (data.coordinates && data.coordinates[0]),
      lng: data.lng || (data.coordinates && data.coordinates[1])
    };
    const query = queryString.stringify(queryData);

    /**
     * We don't want to submit to the next page if the autocomplete
     * predictions are open in the location search input field.
     */
    if (!this.props.isOpen) {
      browserHistory.push(`/jobs?${query}`);
    }
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
          placeholder="Software Engineer"
          component={SelectInput}
          options={jobOptions}
          location={location}
        />
        <Field
          name="location"
          label="Location"
          placeholder="San Francisco"
          component={Input}
          location={location}
          autocomplete={true}
        />
        <Field name="submitButton" component={Button} location={location} />
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
      state.location &&
      state.location.city &&
      `${state.location.city}, ${state.location.region}`,
    coordinates: state.location && state.location.ll
  },
  isOpen: state.search.jobs.isOpen
});

export default connect(mapStateToProps)(SearchForm);

const SearchFormContainer = styled.form`
  display: flex;
  width: 100%;
  background: #fff;
  height: 80px;
  margin-top: 30px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.18),
    0 2px 4px rgba(27, 39, 51, 0.1);

  ${media.phablet`
    flex-direction: column;
    height: auto;
    margin-top: 20px;
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 4px 16px rgba(27, 39, 51, 0.14);
  `};
`;

const SearchInput = styled.input`
  position: relative;
  top: -1px;
  border: 0;
  height: 100%;
  font-weight: 800;
  padding-top: 8px;
  font-size: 20px;

  &:focus {
    outline: none;
  }

  ${media.phone`
    font-size: 18px;
  `};
`;

const SearchInputClear = styled.div`
  transition: all 200ms ease;
  font-family: Avenir;
  opacity: ${props => (props.hasValue ? '1' : '0')};
  color: #afafaf;
  cursor: pointer;
  display: table-cell;
  position: relative;
  -webkit-text-align: center;
  text-align: center;
  vertical-align: middle;
  font-weight: 100;
  width: 17px;
  position: absolute;
  bottom: 16px;
  right: 15px;
  font-size: 20px;

  &:hover {
    color: #212121;
  }

  ${media.tablet`
    bottom: 12px;
  `};
`;

const SearchLabel = styled.label`
  margin-top: 15px;
  font-size: 17px;

  ${media.tablet`
    font-size: 16px;
  `};

  ${media.phone`
    font-size: 14px;
  `};
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 206px;
  padding: 0 15px 15px;

  ${media.tablet`
    padding: 0 0px 15px 15px;
  `};

  ${media.phablet`
    border-bottom: 1px solid #e5e7ea;
  `};

  ${media.phone`
    padding: 0 0px 10px 15px;
  `};

  &:first-child {
    margin-right: 0;
    padding-right: 15px;
    border-right: 1px solid #e5e7ea;

    ${media.phablet`
      border-right: 0;
    `};
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

  ${media.tablet`
    width: 120px;
    font-size: 16px;
  `};

  ${media.phablet`
    height: 50px;
    margin: 15px;
    width: auto
  `};

  ${media.phone`
    height: 44px;
  `};
`;

const SelectContainer = styled.div`
  .Select {
    position: relative;
    top: -1px;
    padding-top: 8px;
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

  .Select-arrow-zone {
    display: none;
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
    font-weight: 200;
  }

  .Select-placeholder,
  .Select--single > .Select-control .Select-value {
    display: flex;
    align-items: center;
    bottom: 0;
    color: #d8d9d8;
    left: 0;
    line-height: 1.5;
    padding-left: 0;
    padding-right: 18px;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .has-value.Select--single > .Select-control .Select-value .Select-value-label,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control
    .Select-value
    .Select-value-label {
    font-weight: 800;
    color: rgba(0, 0, 0, 0.85);
  }
  .has-value.Select--single
    > .Select-control
    .Select-value
    a.Select-value-label,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control
    .Select-value
    a.Select-value-label {
    cursor: pointer;
    text-decoration: none;
  }
  .has-value.Select--single
    > .Select-control
    .Select-value
    a.Select-value-label:hover,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control
    .Select-value
    a.Select-value-label:hover,
  .has-value.Select--single
    > .Select-control
    .Select-value
    a.Select-value-label:focus,
  .has-value.is-pseudo-focused.Select--single
    > .Select-control
    .Select-value
    a.Select-value-label:focus {
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

  .Select-clear-zone {
    transition: opacity 200ms ease;
    font-family: Avenir;
    opacity: 0;
    color: #afafaf;
    cursor: pointer;
    display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    font-weight: 100;
    width: 17px;
  }
  .Select-clear-zone:hover {
    color: #676767;
  }
  .Select-clear {
    display: inline-block;
    font-size: 20px;
    line-height: 1;
  }

  .is-open .Select-arrow,
  .Select-arrow-zone:hover > .Select-arrow {
    border-top-color: #666;
  }

  .Select.has-value .Select-clear-zone {
    opacity: 1;
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
    width: 363px;

    z-index: 1;
    -webkit-overflow-scrolling: touch;

    ${media.tablet`
      margin-top: 10px;
      width: 110%;
      right: 0;
    `};
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
