const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authenticationMiddleware');

const usuariosRoutes = require('./usuario_route');
const menuRoutes = require('./menu_route');
const ordenesRoutes = require('./orden_route');
const resenasRoutes = require('./resenas_route');
const sucursalesRoutes = require('./sucursales_route');
const utilsRoutes = require('./utils_route');
const authRoutes = require('./auth_route'); // sin protección

// Ruta pública
router.use('/auth', authRoutes);

// Rutas protegidas
router.use('/utils', utilsRoutes);
router.use('/sucursales', sucursalesRoutes);
router.use('/ordenes', ordenesRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/menu', menuRoutes);
router.use('/resenas', resenasRoutes);

module.exports = router;
