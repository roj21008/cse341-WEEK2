const router =require('express').Router();
const countriesController= require('../controllers/countries');

const validator = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/',countriesController.getAllCountries);
router.get('/:id' ,countriesController.getSingleCountry);
router.post('/' ,isAuthenticated,validator.validateCountry,countriesController.newData);
router.put('/:id',isAuthenticated,validator.validateCountry,countriesController.updateData);
router.delete('/:id' ,isAuthenticated,validator.validateCountry,countriesController.deleteData);

module.exports = router;