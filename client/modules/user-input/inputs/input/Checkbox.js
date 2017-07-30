// @flow
import React from 'react';
import InputWrapper from '../components/InputWrapper';
import styled from 'styled-components';
import { Input } from './Input';

// sort the array alphabetically based on the label
const alphabeticalSort = (
  prev: { label: string },
  next: { label: string }
): number => {
  const textPrv = prev.label.toUpperCase();
  const textNext = next.label.toUpperCase();
  return textPrv < textNext ? -1 : textPrv > textNext ? 1 : 0;
};

export const Checkbox = (props: {
  options: Array<{ value: string, label: string, icon: any }>,
  input: { value: string, onChange: Function },
  meta: { touched: boolean, error: boolean, invalid: boolean }
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  if (props.options) {
    return (
      <InputWrapper {...props}>
        <CheckboxGroupWrapper>
          {props.options.sort(alphabeticalSort).map(option => {
            const checked = props.input.value.indexOf(option.value) !== -1;
            return (
              <CheckboxGroupItem
                htmlFor={option.value}
                key={option.value}
                checked={checked}
              >
                <CheckboxGroupIcon checked={checked}>
                  {option.icon}
                </CheckboxGroupIcon>
                <div>
                  {option.label}
                </div>
                <CheckboxGroupInput
                  type="checkbox"
                  value={option.value}
                  id={option.value}
                  name={option.value}
                  checked={checked}
                  onChange={event => {
                    const newValue = [...props.input.value];
                    if (event.target.checked) {
                      newValue.push(option.value);
                    } else {
                      newValue.splice(newValue.indexOf(option.value), 1);
                    }

                    return props.input.onChange(newValue);
                  }}
                />
              </CheckboxGroupItem>
            );
          })}
        </CheckboxGroupWrapper>
      </InputWrapper>
    );
  }

  return (
    <InputWrapper {...props}>
      <Input
        {...props.input}
        type="checkbox"
        id={props.input.name}
        name={props.input.name}
        placeholder={props.placeholder}
        style={{ borderColor: showError ? '#f73c3c' : '' }}
      />
    </InputWrapper>
  );
};

const CheckboxGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  border-radius: 3px;
  overflow: hidden;
`;

const CheckboxGroupItem = styled.label`
  display: flex;
  align-items: center;
  flex-basis: 49.5%;
  padding: 10px 20px;
  border-radius: 2px;
  background: ${props => (props.checked ? props.theme.colors.blue : '#f9f8f7')};
  color: ${props => (props.checked ? '#fff' : 'rgba(0,0,0,0.85)')};
  margin-bottom: 1%;
  cursor: pointer;
`;

const CheckboxGroupIcon = styled.div`
  margin-right: 12px;

  svg {
    padding: 1px;

    path {
      stroke: ${props => (props.checked ? '#fff' : 'rgba(0,0,0,0.85)')};
    }
  }
`;

const CheckboxGroupInput = styled.input`display: none;`;
