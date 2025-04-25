const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios');
const menuRoutes = require('./menu');
const ordenesRoutes = require('./ordenes');
const resenasRoutes = require('./resenas');
const sucursalesRoutes = require('./sucursales');
router.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando 🚀' });
});

router.use('/sucursales', sucursalesRoutes);
router.use('/ordenes', ordenesRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/menu', menuRoutes);
router.use('/resenas', resenasRoutes);

module.exports = router;
