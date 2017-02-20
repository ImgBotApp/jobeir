import React, { Component } from 'react';
import Helmet from "react-helmet";

import AppHead from '../../app/components/AppHead';

class Core extends Component {
  render() {
    return (
      <div>
        <AppHead />
        {this.props.children}
      </div>
    );
  }
}
export default Core;