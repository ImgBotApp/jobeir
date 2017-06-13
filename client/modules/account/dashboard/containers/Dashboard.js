import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';
import DashboardCompany from './DashboardCompany';
import Jobs from '../../jobs/containers/Jobs';

class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        {
          // <DashboardCompany />
        }
        <Jobs />
      </DashboardContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(UserWrapper(Dashboard));

const DashboardContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
`;
