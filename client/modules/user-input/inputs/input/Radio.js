// @flow
import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const RadioYesNo = ({ props, showError }) => (
  <InputWrapper {...props}>
    <RadioContainer>
      {props.options.map(option => (
        <RadioInputContainer key={option.value}>
          <RadioInput
            {...props.input}
            type="radio"
            id={props.input.name}
            name={props.input.name}
            value={option.value}
            showError={showError}
            checked={option.value === props.input.value}
          />
          <RadioText showError={showError}>{option.text}</RadioText>
        </RadioInputContainer>
      ))}
    </RadioContainer>
  </InputWrapper>
);

const RadioCircleList = ({ props, showError }) => (
  <InputWrapper {...props}>
    <RadioCircleListContainer>
      {props.options.map(option => (
        <RadioCircleListInputContainer key={option.value}>
          <RadioCircleListInput
            {...props.input}
            type="radio"
            id={props.input.name + option.value}
            name={props.input.name}
            value={option.value}
            showError={showError}
            checked={option.value === props.input.value}
          />
          <RadioCircleListLabel
            showError={showError}
            htmlFor={props.input.name + option.value}
          >
            {option.text || option.name}
          </RadioCircleListLabel>
        </RadioCircleListInputContainer>
      ))}
    </RadioCircleListContainer>
  </InputWrapper>
);

const RadioList = ({ props, showError }) => (
  <InputWrapper {...props}>
    <RadioListContainer>
      {props.options.map(option => {
        /**
         * We're allowing for objects to be passed in as value to these select
         * option input fields. To do so, the object must be JSON (a string)
         * to be stored within the HTML elelent
         */
        const val: string =
          typeof option.value === 'object'
            ? JSON.stringify(option.value)
            : option.value;

        // allowing re-assignment of the value if it's address input
        const checked: boolean = val === props.input.value;
        {
          /* 
        if (props.meta.form === 'job-edit' && props.input.name === 'address') {
          checked = val === JSON.stringify(props.initialValues.address);
        } */
        }

        return (
          <RadioListInputContainer
            checked={checked}
            key={val}
            row={props.row}
            rowWidth={props.rowWidth}
            showError={showError}
          >
            <RadioListInput
              {...props.input}
              type="radio"
              id={props.input.name}
              name={props.input.name}
              value={val}
              data-val={JSON.stringify(option.value)}
              showError={showError}
              checked={checked}
            />
            <RadioListText checked={checked} showError={showError}>
              {option.name}
            </RadioListText>
          </RadioListInputContainer>
        );
      })}
    </RadioListContainer>
  </InputWrapper>
);

export const Radio = (props: {
  type: string,
  row?: string,
  rowWidth?: number,
  options: Array<{
    value: string,
    text?: string,
    name?: string
  }>,
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  switch (props.type) {
    case 'yes/no':
      return <RadioYesNo showError={showError} props={props} />;
    case 'list':
      return <RadioList showError={showError} props={props} />;
    case 'circle':
      return <RadioCircleList showError={showError} props={props} />;
    default:
      throw new Error(
        'Remember to pass the prop "type" to Radio as list or yes/no'
      );
  }
};

Radio.defaultProps = {
  rowWidth: undefined,
  row: ''
};

const RadioContainer = styled.div`display: flex;`;

const RadioInputContainer = styled.div`
  position: relative;
  margin: 2rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    margin-left: 2rem;

    ${media.phablet`
      margin-left: 1.5rem;
    `};
  }

  input[type='radio']:checked {
    background: ${props => props.theme.colors.pink};
    border-color: ${props => props.theme.colors.pink};
  }

  input[type='radio']:checked ~ div {
    color: white;
  }
`;

const RadioInput = styled.input`
  border: solid 1px;
  border-color: ${props =>
    props.showError ? props.theme.error.color : '#f7f5f5'};
  padding: ${props => props.theme.input.padding};
  font-size: ${props => props.theme.input.fontSize};
  width: ${props => props.theme.input.width};
  margin: ${props => props.theme.input.margin};
  max-width: ${props => props.theme.input.maxWidth};
  background: ${props => (props.showError ? '#fee7e8' : '#f9f8f7')};

  position: absolute;
  appearance: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;

  ${media.phablet`
    width: 56px;
    height: 56px;
  `};

  &:active,
  &:focus {
    border-color: ${props =>
      props.showError
        ? props.theme.error.color
        : props.theme.input.activeBorderColor};
  }
`;

const RadioText = styled.div`
  position: relative;
  top: 2px;
  pointer-events: none;
  color: ${props =>
    props.showError ? props.theme.error.color : props.theme.text};
`;

/**
 * Radio List version styles
 */
const RadioCircleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RadioCircleListInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;
  color: #797979;
  margin-bottom: 14px;
`;

const RadioCircleListInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + label {
    color: ${props => props.theme.colors.purple};
  }

  &:checked + label::before {
    background: ${props => props.theme.colors.purple};
    border-color: ${props => props.theme.colors.purple};
  }

  &:checked + label::after {
    top: 4px;
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    content: '';
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    background: white;
    left: 6px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

const RadioCircleListLabel = styled.label`
  position: relative;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  color: #888888;

  &::before {
    top: -2px;
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    content: '';
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid #888888;
    transition: all 200ms ease-in-out;
  }

  &:hover {
    color: ${props => props.theme.colors.purple};
  }

  &:hover::before {
    border-color: ${props => props.theme.colors.purple};
    background: ${props => props.theme.colors.purple};
  }
`;

/**
 * Radio List version styles
 */
const RadioListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
  border-radius: 3px;

  ${media.tablet`
    margin: 5px auto 25px;
  `};
`;

const RadioListInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.row === 'full' ? '' : 'center')};
  flex-basis: ${props =>
    props.row === 'full'
      ? '100%'
      : props.rowWidth ? `${props.rowWidth}%` : '49.5%'};
  border: solid 1px;
  border-color: ${props => (props.showError ? '#f27c5e' : '#f7f5f5')};
  padding: 15px;
  background:${props =>
    props.showError
      ? props.theme.error.color
      : props.checked ? '#f27c5e' : '#f9f8f7'};
  }
  color: ${props => (props.checked ? '#fff' : 'rgba(0,0,0,0.85)')};
  border-radius: 2px;
  margin-bottom: 1%;
  cursor: pointer;
  
  ${media.tablet`
    padding: 14px;
    font-size: 14px;
  `};

  input[type=radio]:checked {
    background: ${props => props.theme.colors.pink};
    border-color: ${props => props.theme.colors.pink};
  }

  input[type=radio]:checked ~ div {
    color: white;
  }
`;

const RadioListInput = styled.input`
  appearance: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background:${props =>
    props.showError ? '#fee7e8' : props.checked ? '#f27c5e' : '#f9f8f7'};
  }
  color: ${props => (props.checked ? '#fff' : 'rgba(0,0,0,0.85)')};
  border-radius: 2px;
  margin-bottom: 1%;
  border-color: #f9f8f7;
  cursor: pointer;

  &:active,
  &:focus {
    background: ${props => props.theme.colors.pink};
    border: 1px solid ${props =>
      props.showError ? props.theme.error.color : props.theme.colors.pink};
    color: white;
  }

  &:active ~ div,
  &:focus ~ div {
    color: white;
  }
`;

const RadioListText = styled.div`
  position: relative;
  top: 2px;
  pointer-events: none;
  color: ${props =>
    props.showError ? props.theme.error.color : props.theme.text};
`;
