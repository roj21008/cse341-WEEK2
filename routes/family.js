const router =require('express').Router();
const familyController= require('../controllers/family');

const validator = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate");



router.get('/',familyController.getAllFamily);
router.get('/:id' ,familyController.getSingleFamily);
router.post('/' ,isAuthenticated,validator.validateFamily,familyController.newMemberFamily);
router.put('/:id',isAuthenticated,validator.validateFamily,familyController.updateFamily);
router.delete('/:id' ,isAuthenticated,familyController.deleteMember);

module.exports = router;

