// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';
import JobFormAbout from './JobFormAbout';
import JobFormType from './JobFormType';
import JobFormCompensation from './JobFormCompensation';
import JobFormContact from './JobFormContact';

class JobForm extends Component {
  componentWillUnmount() {
    this.props.dispatch(reset('job'));
  }

  nextPage = (path: string): void => {
    browserHistory.push(path);
  };

  prevPage = (path: string): void => {
    browserHistory.push(path);
  };

  render() {
    const { params, pathname } = this.props;
    // brute coded for now, need to cleanup this logic.
    const about: string = `/create/job/about/${params.companyId}`;
    const type: string = `/create/job/type/${params.companyId}`;
    const compensation: string = `/create/job/compensation/${params.companyId}`;
    const contact: string = `/create/job/contact/${params.companyId}`;

    return (
      <div>
        {pathname.includes(about) &&
          <JobFormAbout nextPage={() => this.nextPage(type)} />}
        {pathname.includes(type) &&
          <JobFormType
            params={params}
            prevPage={() => this.prevPage(about)}
            nextPage={() => this.nextPage(compensation)}
          />}
        {pathname.includes(compensation) &&
          <JobFormCompensation
            prevPage={() => this.prevPage(type)}
            nextPage={() => this.nextPage(contact)}
          />}
        {pathname.includes(contact) &&
          <JobFormContact
            params={params}
            prevPage={() => this.prevPage(compensation)}
          />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(JobForm);
