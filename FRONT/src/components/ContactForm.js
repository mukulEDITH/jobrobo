import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/contactsadd', { name, phoneNumber, email })
      .then((response) => {
        // Handle success (e.g., clear form, update contacts)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Add Contact</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ContactForm;
