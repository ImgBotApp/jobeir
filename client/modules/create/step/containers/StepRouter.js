import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

class StepRouter extends Component {
  componentDidMount() {
    this.handleRouting();
  }

  compnentDidMount(prevProps) {
    // if (
    //   this.props.user.companies.created.length !==
    //   prevProps.user.companies.created.length
    // ) {
    this.handleRouting();
    // }
  }

  handleRouting() {
    const { user } = this.props;

    if (!user.agreedToValues) {
      browserHistory.push('/create/company/onboarding');
    }

    if (!user.companies && !user.companies.length) {
      browserHistory.push('/create/company/about');
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
