const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();


// =full api path =>/POST/api/auth/register
router.post('/register', authController.userRegisterController)

// =full api path =>/POST/api/auth/register

router.post('/login', authController.userLoginController)

// =full api path =>/POST/api/auth/logout

router.post('/logout', authController.userLogoutController)



module.exports = router;