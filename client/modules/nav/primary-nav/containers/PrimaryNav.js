import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';
import PrimaryNavNav from '../components/PrimaryNavNav';

const PrimaryNav = (props) => {
  return (
    <Navigation isAuthenticated={props.isAuthenticated}>
      <PrimaryNavLogo />
      <PrimaryNavLinks />
    </Navigation>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrimaryNav);

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid ${props => props.isAuthenticated ? '#DBDBDB' : 'transparent'};
`;