const express = require('express');
const router = express.Router();
const checkExists = require('../middlewares/check')
const checkBefore = require('../middlewares/checkBeforeSignin')
    //import signin and signup controller
const { signInController, signUpController } = require('../../E-commerce-server/controllers/user.controller');

//all routes 
//Routes for signIn 
router.post('/api/signin',checkBefore, signInController);

//Routes for signUp for user
router.post('/api/signup', checkExists, signUpController);

// signup route for admin 
// router.post('/api/admin/signup', checkExists, signUpController)


//export router
module.exports = router;