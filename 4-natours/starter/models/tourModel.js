const mongoose = require('mongoose')

// creating a db schema for a tour
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
})

// creating a model out of the schema
const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
