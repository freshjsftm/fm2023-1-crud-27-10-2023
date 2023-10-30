const express = require('express');
const ThingController = require('./controllers/thing.controller');
const app = express();

app.use(express.json());

app.get('/things', ThingController.getAllThings);

app.get('/things/:idThing', ThingController.getThing);

app.put('/things/:idThing', ThingController.updateThing);

app.post('/things', ThingController.createThing);

module.exports = app;
