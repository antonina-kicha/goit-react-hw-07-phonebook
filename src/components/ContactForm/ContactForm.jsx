import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import { FormWrapper, Button } from './ContactForm.styled'

import { useState } from 'react';

import { useDispatch } from "react-redux";
import {addContact} from 'redux/operations'

const Input = styled(Field)`
    width: 250px;
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
        dispatch(addContact(({name, phone})));
        console.log(name, phone);
        resetForm();
    }

    const resetForm = () => {
        setName('');
        setPhone('');
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
            </FormWrapper>
    )
}

