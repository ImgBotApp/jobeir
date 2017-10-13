// @flow
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import InputWrapper from '../components/InputWrapper';

/**
 * SelectSearch
 */
export const SelectSearch = (props: {
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  /**
   * Small workaround when integrating react-select with redux-form:
   * We have to bass in an empty function onBlur to override what how
   * react-select reset the value to "" when the user leaves the field
   */
  return (
    <InputWrapper {...props}>
      <SelectContainer showError={showError}>
        <Select
          {...props.input}
          id={props.input.name}
          name={props.input.name}
          options={props.options}
          placeholder={props.placeholder}
          onBlur={() => {}}
        />
      </SelectContainer>
    </InputWrapper>
  );
};

const SelectContainer = styled.div`
  .Select {
    position: relative;
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
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.85);
    cursor: default;
    display: table;
    border-spacing: 0;
    border-collapse: separate;
    height: 36px;
    overflow: hidden;
    position: relative;
    width: 100%;
    border-radius: 3px;
    border: solid 1px;
    border-color: ${props =>
      props.showError ? props.theme.error.color : '#babbbb'};
    padding: 16px 18px;
    font-size: 18px;
    width: 100%;
    margin: 0 auto 1rem;

    ${media.tablet`
      font-size: 16px;
      padding: 14px;
    `};
  }
  .Select-control:hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
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
  .is-focused:not(.is-open) > .Select-control {
    border-color: ${props =>
      props.showError ? props.theme.error.color : props.theme.colors.text};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
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
    color: #aaa;
    left: 0;
    line-height: 1.5;
    padding-left: 18px;
    padding-right: 18px;
    font-weight: 600;
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
    font-weight: 400;
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
    -webkit-animation: Select-animation-fadeIn 200ms;
    -o-animation: Select-animation-fadeIn 200ms;
    animation: Select-animation-fadeIn 200ms;
    color: #676767;
    cursor: pointer;
    display: table-cell;
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
    cursor: pointer;
    display: table-cell;
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
    margin-top: 4px;
    max-height: 220px;
    position: absolute;
    top: 100%;
    width: 100%;
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

    ${media.tablet`
      padding: 14px;
    `};

    ${media.phonePlus`
      padding: 12px;
    `};
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
    font-size: 1em;
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
  .Select--multi .Select-value-icon:hover,
  .Select--multi .Select-value-icon:focus {
    background-color: #d8eafd;
    /* Fallback color for IE 8 */
    background-color: rgba(0, 113, 230, 0.08);
    color: #0071e6;
  }
  .Select--multi .Select-value-icon:active {
    background-color: #c2e0ff;
    /* Fallback color for IE 8 */
    background-color: rgba(0, 126, 255, 0.24);
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
