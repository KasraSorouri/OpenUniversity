import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show, genre }) => {
  let books = []
  const result = useQuery(ALL_BOOKS)
  console.log('recommend genre ->', genre)

  if (result.data) {
    books = books.concat(result.data.allBooks)
  }

  const booksToShow = books.filter(book => book.genres.includes(genre))

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre <b> {genre} </b> </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend