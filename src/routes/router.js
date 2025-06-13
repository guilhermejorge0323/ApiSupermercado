const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const roleRouter = require('./roleRouter');
const permissionRouter = require('./permissionRouter');
const securityRouter = require('./securityRouter');

router.use(userRouter);
router.use(loginRouter);
router.use(roleRouter);
router.use(permissionRouter);
roleRouter.use(securityRouter);

module.exports = router;