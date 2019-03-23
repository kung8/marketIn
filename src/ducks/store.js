import { createStore} from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import reducer from './userReducer';

// const persistConfig = {
   // key: 'root',
   // storage
// }



// const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(reducer)
// export const store = createStore(persistedReducer);
export default store

// export const persistor = persistStore(store);

