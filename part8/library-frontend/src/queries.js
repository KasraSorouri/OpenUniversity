import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    published,
    author {
      name
    }
    genres
  }
`

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name, 
      born,
      bookCount: books
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(
      author: $author ,
      genre: $genre
    )
    {
      title,
      published,
      author {
        name
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
      ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      books
    } 
  }
`
export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(
      username: $username, 
      password: $password
      ) {
      value
    }
  }
`
export const ME = gql`
  query me {
    me {
      username
      favouriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`