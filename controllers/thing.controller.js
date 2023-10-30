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

module.exports.getThing = async (req, res, next) => {
  try {
    const {params: {idThing}} = req;
    const [thing] = await Thing.findByPk(idThing);
    if (!thing) {
      return res.status(404).send({ data: 'Not found' });
    }
    res.status(200).send({ data: thing });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const [thing] = await Thing.create(body);
    if(thing){
      return res.status(201).send({ data: thing });
    }
    res.status(400).send({ data: 'Bad Request' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//updateThing
module.exports.updateThing = async (req, res, next) => {
  try {
    const { body, params:{idThing} } = req;
    const [thing] = await Thing.updateByPk(idThing, body);
    if(thing){
      return res.status(203).send({ data: thing });
    }
    res.status(400).send({ data: 'Bad Request' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//deleteThing
module.exports.deleteThing = async (req, res, next) => {
  try {
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};