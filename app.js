const express = require('express');
const ThingController = require('./controllers/thing.controller');
const app = express();

app.use(express.json());

// app.get('/things', ThingController.getAllThings);
// app.post('/things', ThingController.createThing);

app
  .route('/things')
  .get(ThingController.getAllThings)
  .post(ThingController.createThing);

app
  .route('/things/:idThing')
  .get(ThingController.getThing)
  .put(ThingController.updateThing)
  .delete(ThingController.deleteThing);

module.exports = app;
