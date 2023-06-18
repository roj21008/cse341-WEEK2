const express = require('express');
const mongodb = require('./data/database');
const { mongo } = require('mongoose');
//const apidoc = require('./routes/app');
const app = express();
const routes = require('./routes/index')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

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

app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) =>{
    if (err) {
        console.log(err)    
    }
    else{
        app.listen(port, ()=>{console.log(`Database is listening and node Runing on a ${port}`)});
    }
    }
);









