// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import { Checkbox, SubmitButton } from '../../../inputs/input';
import {
  BabyFaceIcon,
  BeerGlassIcon,
  BusIcon,
  ClockIcon,
  CoffeeCupIcon,
  DesktopMonitorIcon,
  DogIcon,
  FamilyIcon,
  FoodBowlIcon,
  GlobeIcon,
  MedicalCrossIcon,
  MoneyFolderIcon,
  PersonSpeakingIcon
} from '../../../../../icons/';

const perkOptions = [
  {
    icon: <CoffeeCupIcon />,
    label: 'Coffee & Snacks',
    value: 'Coffee & Snacks'
  },
  { icon: <FoodBowlIcon />, label: 'Catered meals', value: 'Catered Meals' },
  {
    icon: <BeerGlassIcon />,
    label: 'Drinks',
    value: 'Drinks'
  },
  { icon: <DesktopMonitorIcon />, label: 'Hardware', value: 'Hardware' },
  { icon: <MoneyFolderIcon />, label: '401(k)', value: '401(k)' },
  { icon: <MedicalCrossIcon />, label: 'Healthcare', value: 'Healthcare' },
  { icon: <GlobeIcon />, label: 'Paid vacation', value: 'Paid vacation' },
  { icon: <FamilyIcon />, label: 'Parental leave', value: 'Parental leave' },
  { icon: <BabyFaceIcon />, label: 'Child care', value: 'Child care' },
  { icon: <BusIcon />, label: 'Transportation', value: 'Transportation' },
  {
    icon: <ClockIcon />,
    label: 'Flexible work hours',
    value: 'Flexible work hours'
  },
  { icon: <PersonSpeakingIcon />, label: 'Conferences', value: 'Conferences' },
  { icon: <DogIcon />, label: 'Pet friendly', value: 'Pet friendly' },
  { icon: '', label: 'Unique to company', value: 'Unique to company' }
];

class UpdateCompanyFormPerks extends Component {
  formSubmit = (): void => {
    this.props.nextPage();
  };

  render() {
    const { handleSubmit, companies, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="account"
      >
        <FormHeader text="The perks and benefits" />
        <Field
          name="perks"
          label="Select all that apply"
          options={perkOptions}
          component={Checkbox}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

UpdateCompanyFormPerks = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(UpdateCompanyFormPerks);

export default connect(mapStateToProps)(UpdateCompanyFormPerks);
