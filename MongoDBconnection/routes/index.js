const routes = require('express').Router();


//routes.get('/valentina',(req,res,next)=>{res.json('Hola Soy Valentina')});
//routes.get('/hello',(req,res,next)=>{res.json('Hola a todos')});

routes.use('/users',require('./users'));
module.exports = routes;