import React,{useEffect,useState} from 'react';
import './App.css';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactSearch from './components/ContactSearch';
import axios from 'axios';

function App() {
  

  return (
    <div className="App">
    <h1>Contact List</h1>
    <ContactSearch/>
    <ContactForm/><ContactList/>
  </div>
);
  
} 

export default App;
