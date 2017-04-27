import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer';
import rootSaga from '../../sagas';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();
const enhancer = compose(applyMiddleware(sagaMiddleware, apiMiddleware));

export default function configureStore(initialState) {
  return (store = createStore(rootReducer, initialState, enhancer));
}
