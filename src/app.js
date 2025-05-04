const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Bienvenido a la API de MongoDB Atlas ');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/DB', routes); 

module.exports = app;
