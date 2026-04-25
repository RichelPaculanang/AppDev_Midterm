import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { all } from 'redux-saga/effects';
import auth from '../reducers/auth';
import { userLogin, userRegister } from './auth';

const sagaMiddleware = createSagaMiddleware();

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default function createStore() {
  let store = createReduxStore(persistedReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
}

export function* rootSaga() {
  yield all([userLogin(), userRegister()]);
}