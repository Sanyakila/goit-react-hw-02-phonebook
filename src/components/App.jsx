import React, { Component } from "react";
import shortid from "shortid";
import css from './App.module.css';
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = contact => {
    const id = shortid.generate();
    const contactObject = { ...contact, id };
    if (
      !this.state.contacts.find(
        ({ name }) => name.toLocaleLowerCase() === contact.name.toLowerCase()
      )
    ) {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contactObject],
      }));
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  findContact = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <div>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler} />
          <h2 className={css.title}>Contacts</h2>
          <Filter
            value={this.state.filter}
            onChange={this.findContact}
          />
          {this.state.contacts.length === 0 ?
            (<p className={css.messageUser}>There are no contacts in the Phonebook</p>
            ) : (
              <ContactList
                contacts={this.filterContacts()}
                onDeleteContact={this.deleteContact}
              />
            )}
        </div>
      </div>
    );
  };
};

export default App;