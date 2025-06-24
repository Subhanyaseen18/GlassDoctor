import {configureStore} from '@reduxjs/toolkit';
import {apiHandler} from '@service';
import {persistedReducer} from '@slices/index';
import {persistStore} from 'redux-persist';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiHandler.middleware),
});

export const persistor = persistStore(store);
