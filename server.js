const express = require('express');
const mongodb = require('./data/database');
const { mongo } = require('mongoose');

const app = express();

//agregado

const parser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(parser.json());



const port = process.env.PORT || 500;

app.use('/',require('./routes'));
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  
  });

mongodb.initDb((err) =>{
    if (err) {
        console.log(err)    
    }
    else{
        app.listen(port, ()=>{console.log(`Database is listening and node Runing on a ${port}`)});
    }
    }
);









