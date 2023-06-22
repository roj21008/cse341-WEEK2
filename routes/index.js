const express = require('express');
const router = express.Router();

const usersController= require('../controllers/users');

router.get('/countries',usersController.getAllCountries);
router.get('/countries/:id' ,usersController.getSingleCountry);
router.post('/newdata' ,usersController.newData);
router.put('/updatedata/:id' ,usersController.updateData);
router.delete('/deletedata/:id' ,usersController.deleteData);


module.exports = router;