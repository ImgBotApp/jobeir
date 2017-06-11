import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import CompanyFormAbout from './CompanyFormAbout';
import CompanyFormContact from './CompanyFormContact';
import CompanyFormLocation from './CompanyFormLocation';
import CompanyFormPerks from './CompanyFormPerks';

class CompanyForm extends Component {
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
    const about = '/create/company/about';
    const contact = '/create/company/contact';
    const location = '/create/company/location';
    const perks = '/create/company/perks';

    return (
      <div>
        {pathname === about &&
          <CompanyFormAbout nextPage={() => this.nextPage(contact)} />}
        {pathname === contact &&
          <CompanyFormContact
            prevPage={() => this.prevPage(about)}
            nextPage={() => this.nextPage(perks)}
          />}
        {pathname === perks &&
          <CompanyFormPerks
            prevPage={() => this.prevPage(contact)}
            nextPage={() => this.nextPage(location)}
          />}
        {pathname === location &&
          <CompanyFormLocation prevPage={() => this.prevPage(perks)} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(CompanyForm);
