const { Thing } = require('../models');

module.exports.getAllThings = async (req, res, next)=>{
  try {
    const things = await Thing.findAll();
    if(things.length === 0){
      return res.status(204).send('Empty');
    }
    res.status(200).send(things)
  } catch (error) {
    console.log(error);
    next(error)
  }
}