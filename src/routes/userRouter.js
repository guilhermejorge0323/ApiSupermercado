const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();

router.get('/user', (req,res,next) => userController.getAllRegisters(req,res,next));

router.get('/user/:id', (req,res,next) => userController.getOneRegister(req,res,next));

router.post('/user', (req,res,next) => userController.createUser(req,res,next));

router.put('/user/:id', (req,res,next) => userController.updateRegister(req,res,next));

router.delete('/user/:id', (req,res,next) => userController.deleteRegister(req,res,next));

module.exports = router;