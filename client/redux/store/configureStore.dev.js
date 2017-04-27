import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';
import rootSaga from '../../sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middleware = [apiMiddleware, sagaMiddleware, logger];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
