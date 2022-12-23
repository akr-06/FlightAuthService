const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');

router.route('/signup').post(UserController.create);

module.exports = router;