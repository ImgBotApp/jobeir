import React, { Component } from 'react';

import AppHead from '../../app/components/AppHead';
import Header from '../../header/containers/Header';

class Core extends Component {
  render() {
    return (
      <div>
        <AppHead />
        <Header />
        {this.props.children}
      </div>
    );
  }
}
export default Core;