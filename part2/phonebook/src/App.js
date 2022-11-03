import { useState } from 'react'

import Persons from './components/Persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'

const App = () => {
  
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
  
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
        setPersons(persons.concat(newPerson));
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