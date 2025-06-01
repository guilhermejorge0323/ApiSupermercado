const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');

router.use(userRouter);
router.use(loginRouter);

module.exports = router;