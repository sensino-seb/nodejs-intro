const fs = require('fs');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// reading the data file synchronously
const toursFile = require('path').resolve(
  __dirname,
  './dev-data/data/tours-simple.json'
);

// parse the file into a JSON object
const tours = JSON.parse(fs.readFileSync(toursFile, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
  // build JSend standard for client response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  // convert id to number and find it in tours data
  const tourId = Number(req.params.id);
  const tour = tours.find((el) => el.id === tourId);

  if (tourId > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  if (!tourId) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // build JSend standard for client response
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // add tour to tours
  // console.log(req.body);

  // create new ID (in the future mongoDB will do this)
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  // add data to the tours array
  tours.push(newTour);

  // add data to the file (to mongoDB in the future)
  fs.writeFile(toursFile, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

app.listen(port, (req, res) => {
  console.log(`Express server is listening on port: ${port}`);
});
