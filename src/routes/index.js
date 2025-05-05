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
router.use('/utils', verifyToken, utilsRoutes);
router.use('/sucursales', verifyToken, sucursalesRoutes);
router.use('/ordenes', verifyToken, ordenesRoutes);
router.use('/usuarios', verifyToken, usuariosRoutes);
router.use('/menu', verifyToken, menuRoutes);
router.use('/resenas', verifyToken, resenasRoutes);

module.exports = router;
