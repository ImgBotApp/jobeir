import React, { Component } from 'react';
import Helmet from "react-helmet";

import AppHead from '../components/AppHead';

class App extends Component {
  render() {
    return (
      <div>
        <AppHead />
        {this.props.children}
      </div>
    );
  }
}
export default App;