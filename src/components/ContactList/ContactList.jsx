import { List, ListItem, Button } from './ContactList.styled'
import { useSelector, useDispatch } from "react-redux";
import {deleteContact} from "redux/contactsSlice.jsx"

export const ContactList = () => {
    const contacts = useSelector(state => state.contacts.initiailContacts);
    const filter = useSelector(state => state.filter);

    const dispatch = useDispatch();
    
    const handleDelete = (id) => dispatch(deleteContact(id));

    const getVisibleContasts = () => {
        const normalisedFilter = filter.toLowerCase();
        console.log(contacts);
        if(contacts !== []){
            const visebleContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalisedFilter));
            return visebleContacts;
        };
    }

    const listItems = getVisibleContasts();

    return (
        <>
        <List>
          {listItems.length > 0 && (listItems.map((listItem) => (
                    <ListItem key={listItem.id}><span>{listItem.name}: {listItem.number}</span>
                        <Button type='button' onClick={() => handleDelete(listItem.id)}>Delete</Button>
                    </ListItem>
            )))}
                </List>
        </>
    )
}


