import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/client'

import { ME } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const logedUser = localStorage.getItem('library-user-token')

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(logedUser)
  const client = useApolloClient()
  let genre

  let user = useQuery(ME)

  if (user.data) {
    if (user.data.me) {
      genre = user.data.me.favouriteGenre
    }
  }
  console.log('user ->', user)

  console.log('genre ->', genre)

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