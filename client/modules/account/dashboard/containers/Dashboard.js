import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';

class Dashboard extends Component {
  render() {
    return <DashboardContainer />;
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.account.companies,
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(Dashboard);

const DashboardContainer = styled.div``;
