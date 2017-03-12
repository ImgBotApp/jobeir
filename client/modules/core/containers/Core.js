import React, { Component } from 'react';

import Modal from '../../modal/containers/Modal';
import AppHead from '../../app/components/AppHead';
import Header from '../../header/containers/Header';

class Core extends Component {
  render() {
    return (
      <div>
        <AppHead />
        <Header />
        {this.props.children}
        <Modal />
      </div>
    );
  }
}
export default Core;