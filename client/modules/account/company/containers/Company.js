import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CompanyFilter from './CompanyFilter';
// import CompanyOverview from '../components/CompanyOverview';
// import UpdateCompanyFormAbout from '../../../user-input/forms/form/update-company/UpdateCompanyFormAbout';
// import UpdateCompanyFormContact from '../../../user-input/forms/form/update-company/UpdateCompanyFormContact';
// import UpdateCompanyFormLocation from '../../../user-input/forms/form/update-company/UpdateCompanyFormLocation';
// import UpdateCompanyFormPerks from '../../../user-input/forms/form/update-company/UpdateCompanyFormPerks';
// import UpdateCompanyUpload from '../../../user-input/forms/form/update-company/UpdateCompanyUpload';
import { FadeIn } from '../../../../styles/animate/';

class Company extends Component {
  render() {
    const { company, filter } = this.props;
    return (
      <CompanyContainer>
        <CompanyFilter />

        <FadeIn>
          <CompanyFormContainer>
            {/* {filter === 'Overview' && <CompanyOverview company={company} />}
            {filter === 'About' && <UpdateCompanyFormAbout />}
            {filter === 'Contact' && <UpdateCompanyFormContact />}
            {filter === 'Perks' && <UpdateCompanyFormPerks />}
            {filter === 'Location' && <UpdateCompanyFormLocation />}
            {filter === 'Logo' && <UpdateCompanyUpload />} */}
          </CompanyFormContainer>
        </FadeIn>
      </CompanyContainer>
    );
  }
}

const mapStateToProps = state => ({
  company: state.account.companies.created.find(
    company => company.name === state.account.companies.activeCompany.name
  ),
  filter: state.account.companies.filter
});

export default connect(mapStateToProps)(Company);

const CompanyContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #ececec;
`;

const CompanyFormContainer = styled.div`max-width: 640px;`;
