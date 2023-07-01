const validator = require('../helpers/validate');

const validateCountry = (req, res, next) => {
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


const validateFamily = (req, res, next) => {
  const validationRule = {

    Name:"required|string",
    Lastname:"required|string",
    birth:"required|string", 
    marriage:"required|string", 
    children:"required|integer",
    career:"required|string" 
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
  validateCountry,validateFamily
};