const fs = require('fs');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// reading the data file synchronously
let toursFile;

try {
  toursFile = require('path').resolve(
    __dirname,
    './dev-data/data/tours-simple.json'
  );
} catch (err) {
  console.log(err);
}

// parse the file into a JSON object
let tours = JSON.parse(fs.readFileSync(toursFile, 'utf-8'));

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

// ':id' serves as a variable and can be read with req.params.[variable name]
app.get('/api/v1/tours/:id', (req, res) => {
  // convert id to number and find it in tours data
  const tourId = Number(req.params.id);
  const tour = tours[tourId];

  if (tourId > tours.length || tourId < 0 || !tourId) {
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
  // create new ID (in the future mongoDB will do this)
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  // add data to the tours array
  tours.push(newTour);

  // add data to the file (mongoDB in the future)
  fs.writeFile(toursFile, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

// update tour
app.patch('/api/v1/tours/:id', (req, res) => {
  // convert id to number and find it in tours data
  const tourId = Number(req.params.id);

  if (tourId > tours.length || tourId < 0 || !tourId) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours[tourId];
  const updatedTour = Object.assign(tour, req.body);
  tours[tourId] = updatedTour;

  // add data to the file (mongoDB in the future)
  fs.writeFile(toursFile, JSON.stringify(tours), (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  });
});

// delete tour
app.delete('/api/v1/tours/:id', (req, res) => {
  // convert id to number and find it in tours data
  const tourId = Number(req.params.id);

  if (tourId > tours.length || tourId < 0 || !tourId) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // remove object from array
  tours.splice(tourId, 1);

  // add data to the file (mongoDB in the future)
  fs.writeFile(toursFile, JSON.stringify(tours), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
  console.log(tours);
});

app.listen(port, (req, res) => {
  console.log(`Express server is listening on port: ${port}`);
});
