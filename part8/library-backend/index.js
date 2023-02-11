const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
//const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let searchParams = {}
      if (args.author) {
        searchParams.author =  await Author.findOne({ name: args.author })
      }
      if (args.genre) {
        searchParams.genres = args.genre 
      }
      const books = await Book.find(searchParams).populate('author')
      return books
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    books: async (root) => Book.countDocuments({ author: root })
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const bookAuthor = async(author) => {
        const theAuthor = await Author.findOne({ name: author })
        if (!theAuthor) {
          const newAuthor = new Author({ name: author })
          try {
            await newAuthor.save()
          } catch(error) {
            throw new GraphQLError('Saving Author failed', {
              extensions: {
                code: 'BAD_AUTOR_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
          return newAuthor
        }
        return theAuthor
      }

      const author = await bookAuthor(args.author)
      newBook = new Book({ ...args, author: author })

      try {
        await newBook.save()
      } catch(error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return newBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({name: args.name})
      if(!author) {
        return null
      }
      author.born = args.born 
      try {
        await author.save()
      } catch(error) {
        throw new GraphQLError('Saving Author failed', {
          extensions: {
            code: 'BAD_AUTOR_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          console.log('error ->', error)

          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})