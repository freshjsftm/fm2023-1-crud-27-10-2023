const { Thing } = require('../models');

module.exports.getAllThings = async (req, res, next) => {
  try {
    const things = await Thing.findAll();
    if (things.length === 0) {
      return res.status(204).send({ data: 'Empty' });
    }
    res.status(200).send({ data: things });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const thing = await Thing.create(body);
    if(thing){
      return res.status(201).send({ data: thing });
    }
    res.status(400).send({ data: 'Bad Request' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
