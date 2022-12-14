import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { ContactTitle, Container, MainTitle } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  function addContactOnSubmitForm(name, number) {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contact list`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [newContact, ...prevState]);
  }

  function filterContacts() {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function deletedContact(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Container>
        <MainTitle>PHONEBOOK</MainTitle>
        <ContactForm onSubmit={addContactOnSubmitForm} />
        <ContactTitle>CONTACTS</ContactTitle>
        <Filter filter={filter} onChange={e => setFilter(e.target.value)} />
        <ContactList contacts={filterContacts()} onDeleted={deletedContact} />
      </Container>
    </>
  );
}
