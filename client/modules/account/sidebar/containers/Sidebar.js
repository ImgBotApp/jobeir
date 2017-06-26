import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import SidebarLogo from '../components/SidebarLogo';
import SidebarLinks from '../components/SidebarLinks';

const Sidebar = props => {
  return (
    <SidebarContainer isAuthenticated={props.isAuthenticated}>
      <SidebarLogo />
      <SidebarLinks />
    </SidebarContainer>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated
});

export default connect(mapStateToProps)(Sidebar);

const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 290px;
  background: #f9f8f7;
  padding: 40px 0 0 40px;
`;
