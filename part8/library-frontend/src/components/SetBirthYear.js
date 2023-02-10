import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [addBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const submitBirthYear = () => {
    console.log('variable: name ->', name, ' * born ->', born)
    addBirthYear({ variables: { name, born } })
    setBorn('')
    setName('')
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <div>
        name
        <input
          name='name'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <br />
        born
        <input
          name='born'
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
        <br />
        <button type='submit' onClick={submitBirthYear}>update author</button>
      </div>
    </div>
  )
}

export default SetBirthYear
