const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
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

/*
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

*/

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
      return Book.find({})
      /*
      let filteredBook = books
      if (arg.author){
        filteredBook = filteredBook.filter(b => b.author === arg.author)
      }
      if (arg.genre) {
        filteredBook = filteredBook.filter(b => b.genres.includes(arg.genre))
      }
      return filteredBook
      */
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    books: (root) => Book.filter({ Author : root }).count
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
    editAuthor: (root, args) => {
      const author = Author.findOne({name: args.name})
      if(!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.born }
      //authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      Author.findByIdAndUpdate(updatedAuthor.id, { updatedAuthor },{rawResult:true})
      return updatedAuthor
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