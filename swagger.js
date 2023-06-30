const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API COUNTRIES',
    description: 'Description',
  },
  host: 'assignment7.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);