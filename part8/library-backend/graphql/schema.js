const typeDefs = `
  type Book {
    title: String!,
    published: Int,
    author: Author!,
    id: ID!,
    genres: [String!]
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    books: Int
  }

  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int,
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
    editUser(
      favouriteGenre: String!
    ): User
  }
  
  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs