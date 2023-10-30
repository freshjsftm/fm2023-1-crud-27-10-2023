const express = require('express');
const ThingController = require('./controllers/thing.controller');
const app = express();

app.use(express.json());

app.get('/things', ThingController.getAllThings);

app.post('/things', ThingController.createThing);

module.exports = app;
