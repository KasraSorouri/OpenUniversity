import { gql } from '@apollo/client'

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
  query allBooks {
    allBooks {
      title,
      published,
      author
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
    author
    genres
  }
}
`