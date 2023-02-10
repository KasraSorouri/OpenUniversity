import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [addBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const submitBirthYear = () => {
    addBirthYear({ variables: { name, born } })
    setBorn('')
    setName('')
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submitBirthYear}>
        name
        <select
          name='name'
          value={name}
          onChange={({ target }) => setName( target.value )} >
          {authors.map(author => {
            return(
              <option key={author.name}>{author.name}</option>
            )
          })}
        </select>
        <br />
        born
        <input
          name='born'
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
        <br />
        <input type='submit' value={'update author'} />
      </form>
    </div>
  )
}

export default SetBirthYear
