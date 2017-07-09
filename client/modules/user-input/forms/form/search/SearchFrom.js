import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { Text, SubmitButton } from '../../../inputs/input';
import { required } from '../../../validation';
import queryString from 'query-string';

const Input = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <SearchInputContainer>
      <SearchLabel htmlFor={props.input.name}>
        {props.label}
      </SearchLabel>
      <SearchInput
        {...props.input}
        type={props.input.type || 'text'}
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        showError={showError}
        autoFocus={props.autoFocus}
      />
    </SearchInputContainer>
  );
};

const Button = props => {
  return (
    <SearchButton type="submit" disabled={props.disabled}>
      {props.buttonText || 'Search'}
    </SearchButton>
  );
};

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const queryData = {
      q: data.title,
      l: data.location
    };
    const query = queryString.stringify(queryData);

    console.log(query);
  }

  render() {
    return (
      <SearchFormContainer onSubmit={this.props.handleSubmit(this.formSubmit)}>
        <Field
          name="title"
          label="Job Title"
          validate={[required]}
          component={Input}
          autoFocus={true}
        />
        <Field
          name="location"
          label="Location"
          validate={[required]}
          component={Input}
        />
        <Field name="submitButton" component={Button} />
      </SearchFormContainer>
    );
  }
}

SearchForm = reduxForm({
  form: 'search-home'
})(SearchForm);

const mapStateToProps = state => ({
  initialValues: {
    location: `${state.location.city}, ${state.location.region}`
  }
});

export default connect(mapStateToProps)(SearchForm);

const SearchFormContainer = styled.form`
  display: flex;
  width: 100%;
  border: 1px solid #dce0e0;
  box-shadow: 0 1px 3px 0 #dce0e0;
  border-radius: 4px;
  height: 80px;
  margin-top: 30px;
`;

const SearchInput = styled.input`
  position: relative;
  top: -1px;
  border: 0;
  height: 100%;
  font-weight: 800;
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
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 15px;
  padding-bottom: 15px;

  &:first-child {
    margin-right: 0;
    padding-right: 15px;
    border-right: 1px solid #dce0e0;
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
