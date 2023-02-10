const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const author = require('./models/author')
mongoose.set('strictQuery',false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connectionto MongoDB:', error.message)
  })

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

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, arg) => {
      let searchParams = {}
      if (arg.author) {
        searchParams.author =  await Author.findOne({ name: arg.author })
      }
      if (arg.genre) {
        searchParams.genres = arg.genre 
      }
      const books = await Book.find(searchParams).populate('author')
      return books
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    books: async (root) => Book.countDocuments({ author: root })
  },
  Mutation: {
    addBook: async (root,args) => {
      const bookAuthor = async(author) => {
        const theAuthor = await Author.findOne({ name: author })
        if (!theAuthor) {
          const newAuthor = new Author({ name: author })
          return newAuthor.save()
        }
        return theAuthor
      }
      const author = await bookAuthor(args.author)
      newBook = new Book({ ...args, author: author })
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if(!author) {
        return null
      }
      author.born = args.born 
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})