const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

const loginController = new LoginController();

router.post('/login', (req,res,next) => loginController.login(req,res,next));

module.exports = router;
