import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from '../slices/index';
import { apiHandler } from '../api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiHandler.middleware),
});

export const persistor = persistStore(store);
