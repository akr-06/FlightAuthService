const express = require('express');
const router = express.Router();
 
const { AuthRequestValidator } = require('../../middlewares/index')

const UserController = require('../../controllers/user-controller');

router.route('/signup').post(
    AuthRequestValidator.validateUserAuth,
    UserController.create
    );
router.route('/signin').post(
    AuthRequestValidator.validateUserAuth,
    UserController.signIn
    );


module.exports = router;