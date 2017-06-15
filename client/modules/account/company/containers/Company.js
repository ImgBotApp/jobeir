import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';

class Company extends Component {
  render() {
    return (
      <div>
        <Link to="/create/company/about">Create Company</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies
});

export default connect(mapStateToProps)(Company);

const CompanyContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
