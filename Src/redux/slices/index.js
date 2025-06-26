import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
 
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const root = (state, action) => {
  return persistedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default root;