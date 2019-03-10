import { applyMiddleware, createStore, compose } from 'redux';
import reducer from './userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
   key: 'keysss',
   storage
}

const middlewares = [];

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
persistedReducer,
undefined,
compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

