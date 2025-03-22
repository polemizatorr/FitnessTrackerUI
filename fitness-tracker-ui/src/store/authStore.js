// src/authStore.js
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only 'auth' will be persisted
    // blacklist: [], // use blacklist or whitelist to choose what will be persisted
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;