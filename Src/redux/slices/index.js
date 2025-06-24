import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {apiHandler} from '@service';
import {persistReducer} from 'redux-persist';
import userSlice from './userSlice';

// const rootReducer = combineReducers({
//   user: userSlice,
//   [apiHandler.reducerPath]: apiHandler.reducer,
// });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user'],
  // whitelist: ['user.token', 'user.user'],
};

const persistConfigUser = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['complete_profile, tempToken'],
  whitelist: ['user.token', 'user.user'],
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfigUser, userSlice),
  [apiHandler.reducerPath]: apiHandler.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const persistedReducer = persistReducer(persistConfig, rootReducer);
