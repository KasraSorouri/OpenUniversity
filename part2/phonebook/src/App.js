import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
      axios
        .get('http://localHost:3001/persons')
        .then(respons => {
          setPersons(respons.data)
        })
    },[])
  
    const handelNameChange = (event) => {
      setNewName(event.target.value)
    }

    const addNewPerson = (event) => {
      event.preventDefault();
      
      if (persons.find(person => person.name === newName)) {
        console.log('find');
        alert(`${newName} is already add to the phonebood`)
      } else { 
          const newPerson = {
          name: newName,
          number: newNumber
        }
        axios
          .post('http://localHost:3001/persons',newPerson)
          .then(res => setPersons(persons.concat(res.data)))
        setNewName('');
        setNewNumber('')
      }
    }

    const handelNewPhone = (event) => {
      setNewNumber(event.target.value)
    }

    return (
      <div>
        <h2>Phonebook</h2> 
        <Search setSearch={setSearch} search={search} />
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} handelNameChange={handelNameChange} handelNewPhone={handelNewPhone} addNewPerson={addNewPerson} />
        <h2>Numbers</h2>
        <Persons persons={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))} />
      </div>
    )
}

export default App;