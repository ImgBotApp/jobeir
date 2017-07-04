import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';

class Company extends Component {
  render() {
    const { company } = this.props;
    return (
      <div>
        <Link to="/create/company/about">Create Company</Link>
        <div>
          {company.displayName}
        </div>
        <div>
          <img src={company.logo} alt={company.displayName} />
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
        <div>
          {company.perks.map(perk =>
            <span key={perk}>
              {perk}
            </span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.companies.created.find(
    company => company.name === state.companies.activeCompany.name
  )
});

export default connect(mapStateToProps)(Company);

const CompanyContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
