import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { fetchContacts, addContact, deleteContact } from './operations';

const fetchPending = (state) => {
    state.isLoading = true;
};
const fetchRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};
  
export const contactsSlice = createSlice({
    name: 'contact',
    initialState: { items: [], isLoading: false, error: null },
    extraReducers: {
        [fetchContacts.pending]: fetchPending,
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected]: fetchRejected,
        [addContact.pending]: fetchPending,
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [addContact.rejected]: fetchRejected,
        [deleteContact.pending]: fetchPending,
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            console.log(action.payload);
            const index = state.items.findIndex(
                contact => contact.id === action.payload
            );
            state.items.splice(index, 1);
        },
        [deleteContact.rejected]: fetchRejected,
    }
})

const persistConfig = {
  key: 'contacts',
  storage,
}

export const persistedContactsReduser = persistReducer(
    persistConfig,
    contactsSlice.reducer,
);