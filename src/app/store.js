import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
import userSlice from '../layout/userSlice';
import artworkSlice from '../layout/artworkSlice';
import detailsSlice from '../layout/detailsSlice';

const reducers = combineReducers({
    user: userSlice,
    details: detailsSlice,
    artwork: artworkSlice,
  })

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});