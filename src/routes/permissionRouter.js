const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController');
const permissionController = new PermissionController();
const auth = require('../middlewares/auth');

router.get('/permission',(req,res,next) => permissionController.getAllRegisters(req, res, next));
router.get('/permission/:id',(req,res,next) => permissionController.getOneRegister(req, res, next));
router.post('/permission',(req,res,next) => permissionController.createRegister(req,res,next));
router.put('/permission/:id',(req,res,next) => permissionController.updateRegister(req,res,next));
router.delete('/permission/:id',(req,res,next) => permissionController.deleteRegister (req,res,next));


module.exports = router;