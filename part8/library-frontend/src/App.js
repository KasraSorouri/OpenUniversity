import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useQuery, useSubscription } from '@apollo/client'

import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Recommend from './components/Recommend'

export const UpdateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const logedUser = localStorage.getItem('library-user-token')

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(logedUser)
  const client = useApolloClient()
  let genre

  useSubscription(BOOK_ADDED,{
    onData: ({ data }) => {
      window.alert(`new Book ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name} is added`)
      UpdateCache(client.cache,{ query: ALL_BOOKS }, data.data.bookAdded)
    },
  })

  let user = useQuery(ME)

  if (user.data) {
    if (user.data.me) {
      genre = user.data.me.favouriteGenre
    }
  }
  //console.log('user ->', user)
  //console.log('genre ->', genre)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    client.clearStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { (token) ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        ) }
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} genre={genre} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App