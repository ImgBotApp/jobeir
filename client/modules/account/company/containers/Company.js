import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import CompanyFilter from './CompanyFilter';
import UpdateCompanyFormAbout from '../../../user-input/forms/form/update-company/UpdateCompanyFormAbout';
import UpdateCompanyFormContact from '../../../user-input/forms/form/update-company/UpdateCompanyFormContact';
import UpdateCompanyFormLocation from '../../../user-input/forms/form/update-company/UpdateCompanyFormLocation';
import UpdateCompanyFormPerks from '../../../user-input/forms/form/update-company/UpdateCompanyFormPerks';
import UpdateCompanyUpload from '../../../user-input/forms/form/update-company/UpdateCompanyUpload';

class Company extends Component {
  render() {
    const { company, filter } = this.props;
    console.log(filter);
    return (
      <CompanyContainer>
        <CompanyFilter />

        {filter === 'Overview' &&
          <div>
            <CompanyLogoContainer>
              <CompanyLogo src={company.logo} alt={company.displayName} />
            </CompanyLogoContainer>
            <div>
              {company.displayName}
            </div>
            <div>
              {company.product}
            </div>
            <div>
              {company.website}
            </div>
            <div>
              {company.phone}
            </div>
          </div>}

        <div>
          {filter === 'About' && <UpdateCompanyFormAbout />}
          {filter === 'Contact' && <UpdateCompanyFormContact />}
          {filter === 'Perks' && <UpdateCompanyFormPerks />}
          {filter === 'Location' && <UpdateCompanyFormLocation />}
          {filter === 'Logo' && <UpdateCompanyFormLocation />}
        </div>
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

const CompanyHeader = styled.h2`
  font-weight: 600;
  padding: 20px 0 5px;
  font-size: 22px;
  border-top: 1px solid #ececec;
`;

const CompanySubHeader = styled.h3`
  font-weight: 400;
  font-size: 18px;
  color: #9ea4a8;
  margin-bottom: 50px;
`;

const CompanyLogoContainer = styled.div`margin: 50px 0 25px;`;

const CompanyLogo = styled.img`
  height: 40px;
  margin: 0 auto;
`;
