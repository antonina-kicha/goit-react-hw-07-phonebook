import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import { FormWrapper, Button, Error } from './ContactForm.styled'

import { useState } from 'react';

import { useDispatch } from "react-redux";
import {addContact} from 'redux/operations'

const Input = styled(Field)`
    width: 350px;
    height: 20px;
    `;
const FormWithStyle = styled(Form)`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    `;

export const ContactForm = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');


    const dispatch = useDispatch();

    const handleInputChange = evt => {
        console.log(evt.currentTarget.name);
      
        switch (evt.currentTarget.name) {
            case "name":
                setName(evt.currentTarget.value);
                break;
            case "phone":
                setPhone(evt.currentTarget.value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = evt => {
        // evt.preventDefault();
          if (!name || !phone) {
            setError('Please fill out all contact information...');
            return;
        }
        dispatch(addContact(({name, phone})));
        console.log(name, phone);
        resetForm();
    }

    const resetForm = () => {
        setName('');
        setPhone('');
        setError('');
    }

    return (
      <FormWrapper>
        <Formik
        initialValues={{name: '', phone: ''}}
      onSubmit={handleSubmit}
    >
      <FormWithStyle autoComplete = "off">
            <label htmlFor="name">
                Name
            </label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    value={name} onChange={handleInputChange} />

            <label htmlFor="phone">
                Contacts
            </label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    value={phone} onChange={handleInputChange} />

        <Button type="submit" >Add contact</Button>
      </FormWithStyle>
            </Formik>
            {error && <Error>{error}</Error>}
        </FormWrapper>
        
    )
}

