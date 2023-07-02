import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const contactLoc = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contactLoc);
    if (parsedContact) {
      setContacts(parsedContact);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isExist = contacts.find(
      item =>
        item.name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );

    if (isExist) {
      alert('contact already exist');
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const hendleChange = e => {
    setFilter(e.target.value.trim());
  };

  const getFilterContact = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };
  const filteredContacts = getFilterContact();
  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Phonebook</h2>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter hendleChange={hendleChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    </>
  );
};
