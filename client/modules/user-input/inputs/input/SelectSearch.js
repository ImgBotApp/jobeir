import React, { Component } from 'react';
import InputWrapper from '../components/InputWrapper';
import Select from 'react-select';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';

/**
 * SelectSearch
 */
export const SelectSearch = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  /**
   * Small workaround when integrating react-select with redux-form:
   * We have to bass in an empty function onBlur to override what how
   * react-select reset the value to "" when the user leaves the field
   */
  return (
    <InputWrapper {...props}>
      <Select
        {...props.input}
        id={props.input.name}
        name={props.input.name}
        showError={showError}
        options={props.options}
        onBlur={() => {}}
      />
    </InputWrapper>
  );
};
