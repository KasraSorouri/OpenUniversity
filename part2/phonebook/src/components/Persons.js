const Persons = ({person, deletePerson}) => {
  
  return (
    <tr key={person.id}>
      <td>{person.name}</td> 
      <td>{person.number}</td>
      <td>
      <button onClick={deletePerson}>Delete</button>
      </td>
    </tr>
  )
}

export default Persons