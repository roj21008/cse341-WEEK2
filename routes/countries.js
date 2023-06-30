const router =require('express').Router();
const countriesController= require('../controllers/countries');

const validator = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/',countriesController.getAllCountries);
router.get('/:id' ,countriesController.getSingleCountry);
router.post('/' ,isAuthenticated,validator.saveCountry,countriesController.newData);
router.put('/:id',isAuthenticated,validator.saveCountry,countriesController.updateData);
router.delete('/:id' ,isAuthenticated,countriesController.deleteData);

module.exports = router;