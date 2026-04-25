import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import auth from '../reducers/auth';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

  let persistor = persistStore(store);

  const runSaga = sagaMiddleware.run;

  return { store, persistor, runSaga };
};