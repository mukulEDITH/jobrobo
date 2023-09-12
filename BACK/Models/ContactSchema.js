// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  phoneNumber: {
    type: String,
    
  },
  email: {
    type: String,
  
  },
  createdAt: {
    type: Date, // Use the Date type to store timestamps
    default: Date.now, // Set the default value to the current date and time
  },
});

module.exports = mongoose.model('Contact', contactSchema);
