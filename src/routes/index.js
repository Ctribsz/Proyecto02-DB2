const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuario_route');
const menuRoutes = require('./menu_route');
const ordenesRoutes = require('./orden_route');
const resenasRoutes = require('./resenas_route');
const sucursalesRoutes = require('./sucursales_route');
const utilsRoutes = require('./utils_route');
router.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando 🚀' });
});
router.use('/utils', utilsRoutes);
router.use('/sucursales', sucursalesRoutes);
router.use('/ordenes', ordenesRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/menu', menuRoutes);
router.use('/resenas', resenasRoutes);

module.exports = router;
