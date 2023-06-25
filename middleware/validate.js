const validator = require('../helpers/validate');

const saveCountry = (req, res, next) => {
  const validationRule = {

 

    Name:"required|string",
    Capital:"required|string",
    area:"required|integer", 
    habitants:"required|integer", 
    independence:"required|string",
    continent:"required|string" 
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCountry
};