import { configureStore } from "@reduxjs/toolkit";
import { persistedContactsReduser } from './contactsSlice';
import { filterReducer } from './filterSlice';
import { persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'

export const store = configureStore({
    reducer: {
        contacts: persistedContactsReduser,
        filter: filterReducer,
    },
    middleware(getDefaultMiddleware){
        return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })},
});


export const persistor = persistStore(store);
