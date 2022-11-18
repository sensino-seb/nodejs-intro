const fs = require('fs');
const Tour = require('./../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });

// 1. load dev data json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
);

const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DB_PASSWORD
).replace('<DB_USER>', process.env.DB_USER);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established!'));

// 2. create new Tour for every object from the json file
const importDataInDB = async () => {
  try {
    await Tour.create(tours);
    console.log('Sample data successfully loaded.');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted.');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importDataInDB();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please enter an argument');
  process.exit();
}
