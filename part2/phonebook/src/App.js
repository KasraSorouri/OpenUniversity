import { useState } from 'react'

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
        filter shown with <input 
          value={search}
          onChange={(event)=>setSearch(event.target.value)}
          />

        <h2>Add a new</h2>
        <form onSubmit={addNewPerson}>
          <div>
            name: <input 
              value={newName}
              onChange={handelNameChange}
            />
          </div>
          <div>
            phone: <input
              value={newNumber}
              onChange={handelNewPhone} 
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <Persons persons={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))} />
      </div>
    )
}

export default App;

const Persons = (props) => {
  const persons = props.persons

  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}
