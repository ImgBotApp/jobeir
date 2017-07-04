import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import rootSaga from '../../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  return (store = createStore(rootReducer, initialState, enhancer));
}
