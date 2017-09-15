// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod.js');
// } else {
//   module.exports = require('./configureStore.dev.js');
// }

// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import throttle from 'lodash/throttle';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducer';
import rootSaga from '../../sagas';
import { loadState, saveState } from './localstorage';

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore(history: {}, state: {} = {}) {
  let middleware;

  if (process.env.NODE_ENV === 'production') {
    middleware = [apiMiddleware, sagaMiddleware, routerMiddleware(history)];
  } else {
    middleware = [
      apiMiddleware,
      sagaMiddleware,
      routerMiddleware(history),
      logger
    ];
  }

  const enhancer = compose(applyMiddleware(...middleware));

  const initialState = Object.assign({}, state, persistedState);

  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  store.subscribe(
    throttle(() => {
      saveState({
        form: store.getState().form
      });
    }),
    800
  );

  return store;
}
