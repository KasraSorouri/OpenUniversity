const Persons = ({person, deletePerson}) => {
  
  return (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={deletePerson}>Delete</button>
    </p>
  )
}

export default Persons