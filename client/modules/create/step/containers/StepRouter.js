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
    if (user.companies.created.length) {
      browserHistory.push('/create/job')
    } else {
      browserHistory.push('/create/company')
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(StepRouter);
