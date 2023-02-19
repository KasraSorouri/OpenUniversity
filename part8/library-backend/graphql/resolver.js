const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub

const jwt = require('jsonwebtoken')

const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

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

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

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
    editUser: async (root, args, context) => {
      const currentUser = context.currentUser
     
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const user = await User.findById(currentUser._id)

      if(!user) {
        return null
      }
      user.favouriteGenre = args.favouriteGenre 
      try {
        await user.save()
      } catch(error) {
        throw new GraphQLError('Saving User failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return user
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers