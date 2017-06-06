import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import JobFormAbout from './JobFormAbout';
import JobFormType from './JobFormType';
import JobFormCompensation from './JobFormCompensation';
import JobFormContact from './JobFormContact';

class JobForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage(path) {
    browserHistory.push(path);
  }

  prevPage(path) {
    browserHistory.push(path);
  }

  render() {
    const { pathname } = this.props;
    const about = '/create/job/about';
    const type = '/create/job/type';
    const compensation = '/create/job/compensation';
    const contact = '/create/job/contact';
    // console.log(this.props);
    return (
      <div>
        {pathname.includes(about) &&
          <JobFormAbout nextPage={() => this.nextPage(type)} />}
        {pathname.includes(type) &&
          <JobFormType
            prevPage={() => this.prevPage(about)}
            nextPage={() => this.nextPage(compensation)}
          />}
        {pathname.includes(compensation) &&
          <JobFormCompensation
            prevPage={() => this.prevPage(type)}
            nextPage={() => this.nextPage(contact)}
          />}
        {pathname.includes(contact) &&
          <JobFormContact prevPage={() => this.prevPage(compensation)} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(JobForm);
