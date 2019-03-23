import { createStore} from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import reducer from './userReducer';

// const persistConfig = {
   // key: 'root',
   // storage
// }



// const persistedReducer = persistReducer(persistConfig, reducer)


// export const store = createStore(persistedReducer);
export default store = createStore(reducer);

// export const persistor = persistStore(store);

