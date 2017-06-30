import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from '../../intl/containers/IntlWrapper';
import routes from '../../../routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';

export default function App(props) {
  const { store } = props;
  const history = syncHistoryWithStore(browserHistory, store);

  /**
   * key={Math.random()} within the Router removes the error message
   * within the console, but also has side effects like changing
   * the redux state to initial. Be careful!
   */
  return (
    <Provider store={store}>
      <IntlWrapper>
        <Router
          render={props => <ReduxAsyncConnect {...props} />}
          key={Math.random()}
          history={history}
          routes={routes}
        />
      </IntlWrapper>
    </Provider>
  );
}
