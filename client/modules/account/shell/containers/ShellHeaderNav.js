import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';

/**
 * <ShellHeaderNav />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
const ShellHeaderNav = props => (
  <ShellHeaderNavContainer>
    <Link to={`/create/job/about/${props.activeCompany._id}`}>Create Job</Link>
  </ShellHeaderNavContainer>
);

const mapStateToProps = state => ({
  activeCompany: state.companies.activeCompany
});

export default connect(mapStateToProps)(ShellHeaderNav);

const ShellHeaderNavContainer = styled.div`
`;

const ShellHeaderNavHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;
