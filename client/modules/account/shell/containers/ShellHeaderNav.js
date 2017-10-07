// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

/**
 * <ShellHeaderNav />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
const ShellHeaderNav = (props: { activeCompany: { _id: string } }) => {
  const { _id } = props.activeCompany;
  const link: string = _id
    ? `/create/job/about/${_id}`
    : '/create/company/about';

  return (
    <ShellHeaderNavContainer>
      <ShellHeaderNavLink purple to={link}>
        Create Job
      </ShellHeaderNavLink>
      <ShellHeaderNavLink to="/account/jobs">Jobs</ShellHeaderNavLink>
      <ShellHeaderNavLink to="/account/company">Company</ShellHeaderNavLink>
    </ShellHeaderNavContainer>
  );
};

const mapStateToProps = state => ({
  activeCompany: state.account.companies.activeCompany
});

export default connect(mapStateToProps)(ShellHeaderNav);

const ShellHeaderNavContainer = styled.div`
  display: flex;
  align-items: center;

  ${media.tablet`
    padding: 0 10px;
    margin-right: 20px;
  `};

  ${media.phonePlus`
    margin-right: 10px;
  `};
`;

const ShellHeaderNavLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: ${props =>
    props.purple ? props.theme.colors.purple : props.theme.colors.black};
  margin-right: 30px;
`;
