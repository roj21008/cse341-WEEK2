const express = require('express');
const mongodb = require('./data/database');
//const { mongo } = require('mongoose');

const app = express();

const port = process.env.PORT || 8050;

app.use('/',require('./routes'));


mongodb.initDb((err) =>{
    if (err) {
        console.log(err)    
    }
    else{
        app.listen(port, ()=>{console.log(`Database is listening and node Runing on a ${port}`)});
    }
    }
);








