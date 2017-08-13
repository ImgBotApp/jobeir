// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const CompanyOverview = (props: { company: {} }) => {
  const { company } = props;
  return (
    <CompanyOverviewContainer>
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
      </div>
    </CompanyOverviewContainer>
  );
};

const mapStateToProps = state => ({
  filter: state.account.companies.filter
});

export default connect(mapStateToProps)(CompanyOverview);

const CompanyOverviewContainer = styled.div``;

const CompanyLogoContainer = styled.div``;

const CompanyLogo = styled.img`
  height: 40px;
  margin: 0 auto;
`;
