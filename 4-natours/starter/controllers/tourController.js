const fs = require('fs');

// reading the data file synchronously
let toursFile;

try {
  toursFile = require('path').resolve(
    __dirname,
    '../dev-data/data/tours-simple.json'
  );
} catch (err) {
  console.log(err);
}
// parse the file into a JSON object
let tours = JSON.parse(fs.readFileSync(toursFile, 'utf-8'));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour with ID: ${val}`);
  if (Number(req.params.id) > tours.length || Number(req.params.id) < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid request body',
    });
  }

  next();
};

// TOUR ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  // build JSend standard for client response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getOneTour = (req, res) => {
  // ':id' serves as a variable and can be read with req.params.[variable name]
  const tourId = Number(req.params.id);
  const tour = tours[tourId];

  // build JSend standard for client response
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
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
};

exports.deleteTour = (req, res) => {
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
};
