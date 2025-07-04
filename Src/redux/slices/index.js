import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import userReducer from './userSlice';
import { apiHandler } from '../api';

const rootReducer = combineReducers({
  user: userReducer,
  [apiHandler.reducerPath]: apiHandler.reducer, // ✅ Required for RTK Query
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
