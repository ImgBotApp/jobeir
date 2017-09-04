// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';
import CompanyFormAbout from './CompanyFormAbout';
import CompanyFormContact from './CompanyFormContact';
import CompanyFormLocation from './CompanyFormLocation';
import CompanyFormUpload from './CompanyFormUpload';

class CompanyForm extends Component {
  componentWillUnmount() {
    this.props.dispatch(reset('company'));
  }

  nextPage = (path: string) => {
    browserHistory.push(path);
  };

  prevPage = (path: string) => {
    browserHistory.push(path);
  };

  render() {
    const { pathname } = this.props;
    const about: string = '/create/company/about';
    const contact: string = '/create/company/contact';
    const location: string = '/create/company/location';
    const upload: string = '/create/company/upload';

    return (
      <div>
        {pathname === about &&
          <CompanyFormAbout nextPage={() => this.nextPage(contact)} />}
        {pathname === contact &&
          <CompanyFormContact
            prevPage={() => this.prevPage(about)}
            nextPage={() => this.nextPage(location)}
          />}
        {pathname === location &&
          <CompanyFormLocation prevPage={() => this.prevPage(contact)} />}
        {pathname.includes(upload) && <CompanyFormUpload {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(CompanyForm);
