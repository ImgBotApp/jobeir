// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
// import FormWrapper from '../containers/FormWrapper';
// import FormHeader from '../components/FormHeader';
// import {
//   Text,
//   Select,
//   Phone,
//   SubmitButton
// } from '../../inputs/input';
// import {
//   required,
//   phoneNumber,
// } from '../../validation';
// import { createCompany } from '../../../create/company/ducks'

// const parsePhone = value => value.toString().replace(/\D/g, '');

// const companySizeOptions = [
//   { name: 'How many emplooyes?', value: '' },
//   { name: '1 - 9', value: '1 - 9' },
//   { name: '10 - 49', value: '10 - 49' },
//   { name: '50 - 149', value: '50 - 149' },
//   { name: '150 - 499', value: '150 - 499' },
//   { name: '500 - 999', value: '500 - 999' },
//   { name: '1000 +', value: '1000 +' },
// ];
// class CompanyForm extends Component {
//   constructor(props) {
//     super(props);
    
//     this.formSubmit = this.formSubmit.bind(this);
//   }

//   formSubmit(data) {
//     const { dispatch, id } = this.props;
//     // adding the user id to the data;
//     const body = { ...data, id };
    
//     dispatch(createCompany(body));
//   }

//   render() {
//     return (
//       <FormWrapper
//         handleSubmit={this.props.handleSubmit}
//         formSubmit={this.formSubmit}
//         formErrors={this.props.company.errors}
//         theme="marble"
//       >
//         <FormHeader
//           text="Tell us about your company"
//         />
//         <Field
//           name="name"
//           label="Company Name"
//           validate={[ required ]}
//           component={Text}
//         />
//         <Field
//           name="companySize"
//           label="Company Size"
//           validate={[ required ]}
//           options={companySizeOptions}
//           component={Select}
//         />
//         <Field
//           name="product"
//           label="Product"
//           validate={[ required ]}
//           component={Text}
//         />
//         <Field
//           name="website"
//           label="Company Website"
//           validate={[ required ]}
//           component={Text}
//         />
//         <Field
//           name="location"
//           label="Location"
//           validate={[ required ]}
//           component={Text}
//         />
//         <Field
//           name="phone"
//           label="Phone"
//           validate={[ required, phoneNumber ]}
//           parse={parsePhone}
//           component={Phone}
//         />
//         <Field
//           name="submitButton"
//           buttonText="Continue"
//           component={SubmitButton}
//         />
//       </FormWrapper>
//     );
//   }
// };

// const mapStateToProps = state => ({
//   company: state.company,
//   id: state.session.user._id,
// });

// CompanyForm = reduxForm({
//   form: 'company',
// })(CompanyForm);

// export default connect(mapStateToProps)(CompanyForm);


import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import CompanyFormStepOne from './CompanyFormStepOne';
import CompanyFormStepTwo from './CompanyFormStepTwo';
import CompanyFormStepThree from './CompanyFormStepThree';

class CompanyForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        {page === 1 && <CompanyFormStepOne nextPage={this.nextPage}/>}
        {page === 2 && <CompanyFormStepTwo previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 3 && <CompanyFormStepThree previousPage={this.previousPage} />}
      </div>
    )
  }
}

export default CompanyForm;
