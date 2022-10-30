const fs = require('fs');

// reading the data file synchronously
let usersFile;

try {
  usersFile = require('path').resolve(__dirname, '../dev-data/data/users.json');
} catch (err) {
  console.log(err);
}
// parse the file into a JSON object
let users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

exports.checkID = (req, res, next, val) => {
  console.log(`User with ID: ${val}`);
  if (Number(req.params.id) > users.length || Number(req.params.id) < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// USER ROUTE HANDLERS
exports.getAllUsers = (req, res) => {
  // define JSend response
  res.status(200).json({
    status: 'success',
    results: users.length,
    requestedAt: req.requestTime,
    data: {
      users,
    },
  });
};

exports.getOneUser = (req, res) => {
  // ':id' serves as a variable and can be read with req.params.[variable name]
  // convert id to number and find it in tours data
  const userId = Number(req.params._id);
  const user = users[userId];

  // build JSend standard for client response
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  // create new ID (in the future mongoDB will do this)
  const newID = users[users.length - 1]._id + 1;
  const newUser = Object.assign({ _id: newID }, req.body);

  // add data to the tours array
  users.push(newUser);

  // add data to the file (mongoDB in the future)
  fs.writeFile(usersFile, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  });
};

exports.updateUser = (req, res) => {
  // convert id to number and find it in tours data
  const userId = Number(req.params._id);

  if (userId > users.length || userId < 0 || !userId) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const user = users[userId];
  const updatedUser = Object.assign(user, req.body);
  users[userId] = updatedUser;

  // add data to the file (mongoDB in the future)
  fs.writeFile(usersFile, JSON.stringify(users), (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  });
};

exports.deleteUser = (req, res) => {
  // convert id to number and find it in tours data
  const userId = Number(req.params._id);

  if (userId > users.length || userId < 0 || !userId) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // remove object from array
  users.splice(userId, 1);

  // add data to the file (mongoDB in the future)
  fs.writeFile(usersFile, JSON.stringify(users), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};
