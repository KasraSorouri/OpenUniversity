import { useState } from 'react'

const App = () => {
  
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas',
        number: '040-1234567'}
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
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
        <Persons persons={persons} />
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
