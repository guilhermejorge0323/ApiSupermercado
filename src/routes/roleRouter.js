const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
const roleController = new RoleController();
const auth = require('../middlewares/auth');

router.get('/role',auth,(req,res,next) => roleController.getAllRegisters(req, res, next));

router.get('/role/:id',auth,(req,res,next) => roleController.getOneRegister(req, res, next));

router.post('/role',auth,(req,res,next) => roleController.createRegister(req,res,next));

router.put('/role/:id',auth,(req,res,next) => roleController.updateRegister(req,res,next));

router.delete('/role/:id',auth,(req,res,next) => roleController.deleteRegister (req,res,next));


module.exports = router;