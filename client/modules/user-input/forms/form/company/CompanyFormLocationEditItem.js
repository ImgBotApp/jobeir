import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import FormThemes from '../../../themes';
import { Field, reduxForm, change } from 'redux-form';
import FormRow from '../../components/FormRow';
import { PostalCode, Text } from '../../../inputs/input';
import { PencilIcon, ExIcon } from '../../../../../icons/';

class CompanyFormLocationEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { showManualAddressInputs: false };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleEditClick() {
    this.setState({
      showManualAddressInputs: !this.state.showManualAddressInputs
    });
  }

  handleRemoveClick() {
    const { index, fields } = this.props;
    fields.remove(index);
    this.handleEditClick();
  }

  renderPrettyAddress() {
    const { location, locations, index } = this.props;
    const currentLocation = locations[index];

    if (!currentLocation) return null;

    return (
      <div>
        <AddressFirstLine>
          {currentLocation.unit && <span>{currentLocation.unit} {' - '}</span>}
          {currentLocation.street_number}{' '}
          {currentLocation.route},{' '}
          {currentLocation.locality}
        </AddressFirstLine>
        <AddressSecondLine>
          {currentLocation.administrative_area_level_1},{' '}
          {currentLocation.country},{' '}
          {currentLocation.postal_code}
        </AddressSecondLine>
      </div>
    );
  }

  renderAddressForm() {
    const { location } = this.props;

    return (
      <ThemeProvider theme={AddressTheme}>
        <div>
          <AddressFormTop>
            <AddresRemoveButton
              type="button"
              title="Remove Address"
              onClick={this.handleRemoveClick}
            >
              Remove Address
            </AddresRemoveButton>
            <div onClick={this.handleEditClick}>
              <ExIcon height={20} width={20} fill="#444" />
            </div>
          </AddressFormTop>
          <FormRow>
            <Field
              name={`${location}.street_number`}
              type="text"
              component={Text}
              label="Street Number"
            />
            <Field
              name={`${location}.route`}
              type="text"
              component={Text}
              label="Street Address"
            />
          </FormRow>
          <FormRow>
            <Field
              name={`${location}.unit`}
              type="text"
              component={Text}
              label="Unit"
            />
            <Field
              name={`${location}.locality`}
              type="text"
              component={Text}
              label="City"
            />
          </FormRow>
          <FormRow>
            <Field
              name={`${location}.administrative_area_level_1`}
              type="text"
              component={Text}
              label="Province/State"
            />
            <Field
              name={`${location}.country`}
              type="text"
              component={Text}
              label="Country"
            />
          </FormRow>
          <FormRow>
            <Field
              name={`${location}.postal_code`}
              type="text"
              component={Text}
              label="Postal Code / Zip"
            />
          </FormRow>
        </div>
      </ThemeProvider>
    );
  }

  render() {
    return (
      <AddressItem>
        <AddressItemLeft>
          {this.state.showManualAddressInputs
            ? this.renderAddressForm()
            : this.renderPrettyAddress()}
        </AddressItemLeft>
        {!this.state.showManualAddressInputs &&
          <AddressItemRight onClick={this.handleEditClick}>
            <PencilIcon height={20} width={20} />
          </AddressItemRight>}
      </AddressItem>
    );
  }
}

export default CompanyFormLocationEdit;

const AddressTheme = {
  input: {
    borderRadius: '3px',
    border: 'solid 1px #babbbb',
    padding: '10px',
    fontSize: '14px',
    width: '100%',
    margin: '0 auto 0.5rem',
    activeBorderColor: 'rgba(0,0,0,0.8)',
    ph: {
      color: '#afafaf'
    }
  },
  inputWrapper: {
    marginBottom: '0.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '3px',
    fontSize: '14px'
  }
};
const AddressItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  list-style: none;
  border-radius: 3px;
  padding: 16px 20px;
  margin-bottom: 16px;
  background: #f9f8f7;

  svg {
    cursor: pointer;
  }
`;

const AddressItemLeft = styled.div`
  flex: 1;
`;

const AddressItemRight = styled.div`
`;

const AddressFirstLine = styled.div`
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 5px;
`;

const AddressSecondLine = styled.div`
`;

const AddressFormTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddresRemoveButton = styled.button`
  position: relative;
  left: -6px;
  border-radius: 3px;
  outline: none;
  border: none;
  background: #fafafa;
  width: 100%;
  maxWidth: 200px;
  font-size: 14px;
  color: #333;
  width: auto;
  padding: 3px 6px;
  margin-bottom: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.08);
  }
`;
