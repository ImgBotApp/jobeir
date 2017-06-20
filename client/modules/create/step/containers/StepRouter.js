import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

class StepRouter extends Component {
  componentDidMount() {
    this.handleRouting();
  }

  handleRouting() {
    const { params, user } = this.props;

    // If new user, take them through values first
    if (!user.agreedToValues) {
      browserHistory.push('/create/company/onboarding');
    }

    // If user refreshes on create company take them back
    if (params.create === 'company') {
      browserHistory.push('/create/company/about');
    }

    // If user refreshes on job company take them back
    if (params.create === 'job') {
      browserHistory.push(`/create/job/about/${params.companyId}`);
    }
  }

  render() {
    return (
      <StepRouterContainer>
        {this.props.children}
      </StepRouterContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(StepRouter);

const StepRouterContainer = styled.div`
  position: relative;
  width: 960px;
  margin: 0 auto;
  display: flex;
  min-height: calc(100vh - 175px);
`;
