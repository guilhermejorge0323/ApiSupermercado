const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const permission = require('../middlewares/permission');


router.get('/user',auth,role(['Gerente']),permission(['trocar preco de produto']),(req,res,next) => userController.getAllRegisters(req,res,next));

router.get('/user/:id',auth,(req,res,next) => userController.getOneRegister(req,res,next));

router.post('/user',auth,(req,res,next) => userController.createUser(req,res,next));

router.put('/user/',auth,(req,res,next) => userController.updateUser(req,res,next));

router.delete('/user/:id',auth,(req,res,next) => userController.deleteRegister(req,res,next));

module.exports = router;