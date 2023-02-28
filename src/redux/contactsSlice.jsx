import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {fetchContacts, addContact, deleteContact} from './operations'
// addContact, deleteContact
// const initiailContacts = [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
  
export const contactsSlice = createSlice({
    name: 'contact',
    initialState: { items: [], isLoading: false, error: null },
    extraReducers: {
        [fetchContacts.pending](state) {
            state.isLoading = true;
        },
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addContact.pending](state) {
            state.isLoading = true;
        },
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [addContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        [deleteContact.pending](state) {
            state.isLoading = true;
        },
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            console.log(action.payload);
            const index = state.items.findIndex(
                contact => contact.id === action.payload
            );
            state.items.splice(index, 1);

        },
        [deleteContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
    // reducers: {
    //     addContact: {
    //         reducer(state, action) {
    //             state.items.push(action.payload)
    //         },
    //         prepare(name, number) {
    //             return {
    //                 payload: {
    //                     id: nanoid(),
    //                     name,
    //                     number,
    //                 }
    //             }
    //         },
    //     },
       
     
    //     deleteContact(state, action) {
    //         const index = state.items.findIndex(contact => contact.id === action.payload);
    //         state.items.splice(index, 1); 
    //     },

    // },
})

const persistConfig = {
  key: 'contacts',
  storage,
}

export const persistedContactsReduser = persistReducer(
    persistConfig,
    contactsSlice.reducer,
);

// export const { addContact, deleteContact } = contactsSlice.actions;
