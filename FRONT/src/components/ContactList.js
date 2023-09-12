import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contactlist.css'

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [editedContact, setEditedContact] = useState({});

  useEffect(() => {
    axios.get('/contactslist')
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to delete a contact
  const deleteContact = (id) => {
    axios.delete(`/contacts/${id}`)
      .then(() => {
        // After successful deletion, update the contacts list
        setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to start editing a contact
  const startEditing = (id) => {
    setEditingContact(id);
    const contactToEdit = contacts.find((contact) => contact._id === id);
    setEditedContact({ ...contactToEdit });
  };

  // Function to save the edited contact
  const saveEditedContact = () => {
    axios.put(`/contacts/${editingContact}`, editedContact)
      .then(() => {
        // After successful edit, clear editing state
        setEditingContact(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="ContactList">
      <h1>Contact List</h1>
      <table>
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              
              <td>
                {editingContact === contact._id ? (
                  <input
                    type="text"
                    value={editedContact.name}
                    onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                  />
                ) : (
                  contact.name
                )}
              </td>
              <td>
                {editingContact === contact._id ? (
                  <input
                    type="text"
                    value={editedContact.phoneNumber}
                    onChange={(e) => setEditedContact({ ...editedContact, phoneNumber: e.target.value })}
                  />
                ) : (
                  contact.phoneNumber
                )}
              </td>
              <td>
                {editingContact === contact._id ? (
                  <input
                    type="text"
                    value={editedContact.email}
                    onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                  />
                ) : (
                  contact.email
                )}
              </td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
              <td>
                {editingContact === contact._id ? (
                  <button onClick={() => saveEditedContact()}>Save</button>
                ) : (
                  <button onClick={() => startEditing(contact._id)}>Edit</button>
                )}
                <button onClick={() => deleteContact(contact._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
