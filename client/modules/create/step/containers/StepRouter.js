import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

class StepRouter extends Component {
  componentDidMount() {
    this.handleRouting();
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.companies.created.length !== prevProps.user.companies.created.length) {
      this.handleRouting();
    }
  }

  handleRouting() {
    const { user } = this.props;

    /**
     * If the user is not part of a company the router will
     * push the user to create a company before being able
     * to create a job
     */
    // if (user.companies.created.length) {
    //   browserHistory.push('/create/job/about')
    // } else {
    //   browserHistory.push('/create/company/about')
    // }
  }

  render() {
    return (
      <StepRouterContainer>
        {this.props.children}
      </StepRouterContainer>
    );
  }
};

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(StepRouter);

const StepRouterContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  min-height: calc(100vh - 175px);
`;