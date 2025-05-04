const express = require('express');
const router = express.Router();
const controller = require('../controller/menucontroller');

// Obtener todos los elementos con filtros, proyección, ordenamiento y paginación
router.get('/', controller.getAll);

// Obtener un elemento por ID
router.get('/:id', controller.getOne);

// Crear un elemento
router.post('/', controller.createOne);

// Crear múltiples elementos
router.post('/batch', controller.createMany);

// Actualizar un elemento por ID
router.put('/:id', controller.updateOne);

// Actualizar múltiples elementos
router.put('/batch', controller.updateMany);

// Eliminar un elemento por ID
router.delete('/:id', controller.deleteOne);

// Eliminar múltiples elementos
router.delete('/batch', controller.deleteMany);

module.exports = router;