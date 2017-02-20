// import React, { Component } from 'react';
// import Helmet from "react-helmet";

// import AppHead from '../components/AppHead';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <AppHead />
//         {this.props.children}
//       </div>
//     );
//   }
// }
// export default App;
/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from '../../intl/containers/IntlWrapper';

// Import Routes
import routes from '../../../routes';


export default function App(props) {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};