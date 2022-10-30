const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.param('id', userController.checkID)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
