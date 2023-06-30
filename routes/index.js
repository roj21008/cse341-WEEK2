const express = require('express');
const router = express.Router();
const passport = require('passport');
router.use('/',require("./app"));
router.use('/countries',require("./countries"));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if (err) { return next(err);}
        res.direct('/')
    });
});


module.exports = router;