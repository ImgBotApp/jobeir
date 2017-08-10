import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';
import SearchForm from '../../../user-input/forms/form/search/SearchForm';

const PrimaryNav = props => {
  const { isOnJobs } = props;

  return (
    <Navigation isOnJobs={isOnJobs}>
      <NavigationContainer>
        <PrimaryNavLogo />
        {isOnJobs && <SearchForm location="nav" />}
        <PrimaryNavLinks />
      </NavigationContainer>
    </Navigation>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated,
  isOnJobs: state.search.jobs.isFetching || state.search.jobs.isLoaded
});

export default connect(mapStateToProps)(PrimaryNav);

const Navigation = styled.nav`
  flex: 1;
  background: #fff;
  border-bottom: ${props => (props.isOnJobs ? '1px solid #e4e4e4' : 'none')};
  box-shadow: ${props =>
    props.isOnJobs ? '0 1px 5px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 26px;
  height: 75px;
  max-width: ${props => props.theme.width.max};
`;
