const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  //name: {
  //  type: String,
  //  required: true,
  //  unique: true,
  //  minlength: 4
  //},
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  //password: {
  //  type: String,
  //  required: true,
  //  minlength: 6
  //},
  favouriteGenre: 
    {type: String}
  })

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)