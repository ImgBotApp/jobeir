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
  const reduxRouterMiddleware = routerMiddleware(history);
  let middleware;

  /**
   * Here we want to remove redux logger and any other middleware from
   * production to keep things more private and possibly quicker.
   */
  if (process.env.NODE_ENV === 'production') {
    middleware = [apiMiddleware, sagaMiddleware, reduxRouterMiddleware];
  } else {
    middleware = [apiMiddleware, sagaMiddleware, reduxRouterMiddleware, logger];
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
