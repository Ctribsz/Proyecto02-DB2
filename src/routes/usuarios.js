const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');


router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const guardado = await nuevoUsuario.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Crear múltiples usuarios
router.post('/batch', async (req, res) => {
    try {
      const nuevos = await Usuario.insertMany(req.body);
      res.status(201).json(nuevos);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const filtro = {};
  
      // Filtros por query params
      if (req.query.activo) filtro.activo = req.query.activo === 'true';
      if (req.query.rol) filtro.rol = req.query.rol;
      if (req.query.zona) filtro['direccion.zona'] = parseInt(req.query.zona);
  
      // Proyecciones (campos a mostrar)
      const campos = req.query.proyeccion ? req.query.proyeccion.split(',').join(' ') : null;
  
      // Ordenamiento
      const orden = req.query.orden ? JSON.parse(req.query.orden) : {};
  
      // Paginación
      const skip = parseInt(req.query.skip) || 0;
      const limit = parseInt(req.query.limit) || 100;
  
      const usuarios = await Usuario.find(filtro, campos).sort(orden).skip(skip).limit(limit);
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Actualizar múltiples usuarios
router.put('/batch', async (req, res) => {
    const { filtro, datos } = req.body;
  
    try {
      const resultado = await Usuario.updateMany(filtro, { $set: datos });
      res.json({ mensaje: 'Usuarios actualizados', resultado });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Eliminar múltiples usuarios
router.delete('/batch', async (req, res) => {
    try {
      const filtro = req.body;
      const resultado = await Usuario.deleteMany(filtro);
      res.json({ mensaje: 'Usuarios eliminados', resultado });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
module.exports = router;
