import { createSlice, nanoid } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer } from 'redux-persist';

const initiailContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
  
export const contactsSlice = createSlice({
    name: 'contact',
    initialState: { initiailContacts },
    reducers: {
        addContact: {
            reducer(state, action) {
                state.initiailContacts.push(action.payload)
            },
            prepare(name, number) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        number,
                    }
                }
            },
        },
       
     
        deleteContact(state, action) {
            const index = state.initiailContacts.findIndex(contact => contact.id === action.payload);
            state.initiailContacts.splice(index, 1); 
        },

    },
})

const persistConfig = {
  key: 'contacts',
  storage,
}

export const persistedContactsReduser = persistReducer(
    persistConfig,
    contactsSlice.reducer,
);

export const { addContact, deleteContact } = contactsSlice.actions;
