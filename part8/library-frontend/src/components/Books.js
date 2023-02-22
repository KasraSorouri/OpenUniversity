import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  let books = []
  let booksToShow = []
  let genres = []
  const [ genre, setGenre ] = useState('')
  let variables = {}
  //console.log('selected genre ->', genre)
  //console.log('variables ->', variables)

  if ( genre ) {
    variables.genre = genre
  }
  const filteredResult = useQuery(ALL_BOOKS,{ variables: variables })

  if (filteredResult.data) {
    booksToShow = books.concat(filteredResult.data.allBooks)
  }

  const result = useQuery(ALL_BOOKS)

  if (result.data) {
    books = books.concat(result.data.allBooks)
  }


  //const [ booksToShow, setBooksToShow ] = useState([])


  if (books) {
    books.map(book => {
      if (book.genres) {
        book.genres.map(genre => {
          if (!genres.includes(genre)){
            genres = genres.concat(genre)
          }
        })
      }
    })
  }

  const filter = (genre) => {
    setGenre(genre)
    // setBooksToShow(books.filter(book => book.genres.includes(genre)))
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

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
      { (genres) ? genres.map(genre => (
        <button key={genre} onClick={() => filter(genre)}>{genre}</button>
      )
      ): null
      }
    </div>
  )
}

export default Books