import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['likedJobs'],
};

const persistedReducer = persistReducer(config, rootReducer);

export default function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk),
  );

  const persistor = persistStore(store);
  return { store, persistor };
}
