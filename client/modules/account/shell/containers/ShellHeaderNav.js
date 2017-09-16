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
      <ShellHeaderNavLink to={link}>Create Job</ShellHeaderNavLink>
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
  padding: 0 25px;
  margin-right: 25px;

  ${media.tablet`
    padding: 0 10px;
    margin-right: 10px;
  `};
`;

const ShellHeaderNavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.purple};
`;
