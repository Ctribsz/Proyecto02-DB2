const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// Ruta raíz directa
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de MongoDB Atlas ');
});

// Rutas API
app.use('/api', routes);

module.exports = app;
