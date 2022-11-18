const mongoose = require('mongoose');

// creating a db schema for a tour
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration.'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maximum group size.'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty.'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary.'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description.'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image.'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// creating a model out of the schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
