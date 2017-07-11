import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';

/**
 * <ShellHeaderNav />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
const ShellHeaderNav = props =>
  <ShellHeaderNavContainer>
    <ShellHeaderNavLink to={`/create/job/about/${props.activeCompany._id}`}>
      Create Job
    </ShellHeaderNavLink>
  </ShellHeaderNavContainer>;

const mapStateToProps = state => ({
  activeCompany: state.account.companies.activeCompany
});

export default connect(mapStateToProps)(ShellHeaderNav);

const ShellHeaderNavContainer = styled.div`margin-right: 35px;`;

const ShellHeaderNavHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;

const ShellHeaderNavLink = styled(Link)`
  text-decoration: none;
  color: rgba(0,0,0,0.8);
`;
