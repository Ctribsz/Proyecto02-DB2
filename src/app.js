const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Bienvenido a la API de MongoDB Atlas ');
});


app.use('/DB', routes); 

module.exports = app;
