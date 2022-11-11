import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Message from './components/Message'
import './index.css'

const App = () => {
  
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [message, setMassege] = useState(null)

    useEffect(() => {
      personService.getAll()
        .then(respons => {
          setPersons(respons)
        })
    },[])
  
    const handelNameChange = (event) => {
      setNewName(event.target.value)
    }

    const addNewPerson = (event) => {
      event.preventDefault();
      
      const newPerson = {
        name: newName,
        number: newNumber
      }
      const existPerson = persons.find(person => person.name === newName)
      console.log('existPerson' , existPerson); 
      if (existPerson) {
        console.log('find');
        if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one? `)) {
          personService
            .updatePerson(existPerson.id,newPerson)
            .then(res => setPersons(persons.map(person => person.id !== existPerson.id ? person : res)))
          setNewName('');
          setNewNumber('')
          setMassege(`The numbe for ${newPerson.name} is chenge successfully!`)
          setTimeout(()=> setMassege(null),5000)
        }
      } else { 
        personService
          .addPerson(newPerson)
          .then(res => setPersons(persons.concat(res)))
        setNewName('');
        setNewNumber('')
        setMassege(`Added ${newPerson.name} to tho the phonebook successfully!`)
        setTimeout(()=> setMassege(null),5000)
      }
    }

    const handelNewPhone = (event) => {
      setNewNumber(event.target.value)
    }

    const deletePerson = (id) => {
//      console.log('del id', id);
      let person = persons.find(person => person.id === id)
      if (window.confirm(`Delete ${person.name}?`)) {
        personService.removePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
      }
    }
    console.log('message', message);

    return (
      <div>
        <h2>Phonebook</h2> 
        <Message message={message} />
        <Search setSearch={setSearch} search={search} />
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} handelNameChange={handelNameChange} handelNewPhone={handelNewPhone} addNewPerson={addNewPerson} />
        <h2>Numbers</h2>
        {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <Persons key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />)} 
      </div>
    )
}

export default App;