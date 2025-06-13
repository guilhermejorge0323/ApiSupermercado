const express = require('express');
const router = express.Router();
const SecurityController = require('../controllers/SecurityController');
const auth = require('../middlewares/auth');

const securityController = new SecurityController();

router.get('/security/role/:roleId/permissions',auth, (req,res,next) => securityController.getPermissionRole(req, res, next));

router.post('/security/acl',auth,(req, res, next) => securityController.registerAcl(req, res, next));

router.post('/security/permission-role',auth,(req, res, next) => securityController.registerPermissionRole(req, res, next));

router.delete('/security/role/:roleId/permissions',auth, (req,res,next) => securityController.removePermissionRole(req, res, next));

module.exports = router;