import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthYear from './SetBirthYear'

const Authors = (props) => {
  const token = localStorage.getItem('library-user-token')
  if (!props.show) {
    return null
  }
  let authors = []

  const result = useQuery(ALL_AUTHORS)
  if (result.data) {
    authors = authors.concat(result.data.allAuthors)
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { (token) ? (<SetBirthYear authors={authors} />) : null }
    </div>
  )
}

export default Authors