const express = require('express');
const app = express();
const router = require('./routes/router');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);


module.exports = app;