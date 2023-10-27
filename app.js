const express = require('express');
const { getAllThings } = require('./controllers/thing.controller');
const app = express();

app.get('/things', getAllThings)


module.exports = app;