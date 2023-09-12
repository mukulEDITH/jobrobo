// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./Models/ContactSchema');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/jobrobo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// GET all contacts
app.get('/contactslist', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // POST a new contact
  app.post('/contactsadd', async (req, res) => {
    const { name, phoneNumber, email } = req.body;
  
    try {
      const newContact = new Contact({ name, phoneNumber, email });
      await newContact.save();
      res.json(newContact);
      console.log('contact added')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // PUT an existing contact
  app.put('/contacts/:id', async (req, res) => {
      const { name, phoneNumber, email } = req.body;
      const contactId = req.params.id;
    
      try {
        const updatedContact = await Contact.findByIdAndUpdate(
          contactId,
          { name, phoneNumber, email },
          { new: true } // Return the updated contact
        );
    
        if (!updatedContact) {
          return res.status(404).json({ message: 'Contact not found' });
        }
    
        res.json(updatedContact);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });
  
    // DELETE a contact
  app.delete('/contacts/:id', async (req, res) => {
      const contactId = req.params.id;
    
      try {
        const deletedContact = await Contact.findByIdAndRemove(contactId);
    
        if (!deletedContact) {
          return res.status(404).json({ message: 'Contact not found' });
        }
    
        res.json({ message: 'Contact deleted' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });

    app.get('/contacts/:phoneNumber', async (req, res) => {
      const { phoneNumber } = req.params;
    
      try {
        // Perform a search for contacts with a matching phoneNumber
        const contacts = await Contact.find({ phoneNumber });
    
        // Send a JSON response with the matching contacts
        res.json(contacts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
