const express = require('express');
const router = express.Router();

const usersController= require('../controllers/users');

const validator = require("../middleware/validate")

router.get('/countries',usersController.getAllCountries);
router.get('/countries/:id' ,usersController.getSingleCountry);
router.post('/newdata' ,validator.saveCountry,usersController.newData);
router.put('/updatedata/:id',validator.saveCountry,usersController.updateData);
router.delete('/deletedata/:id' ,usersController.deleteData);


module.exports = router;