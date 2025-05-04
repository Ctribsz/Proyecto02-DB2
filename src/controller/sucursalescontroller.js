const mongoose = require('mongoose');
const Sucursal = require('../models/Sucursal');

// Obtener todas las sucursales con filtros opcionales
exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.ciudad) filtro['ubicacion.ciudad'] = req.query.ciudad;

    const campos = req.query.proyeccion ? req.query.proyeccion.split(',').join(' ') : null;
    const orden = req.query.orden ? JSON.parse(req.query.orden) : {};
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;

    const items = await Sucursal.find(filtro, campos).sort(orden).skip(skip).limit(limit);
    console.log('[DEBUG] Documentos encontrados:', items.map(i => ({ id: i._id, nombre: i.nombre })));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener sucursal por ID
exports.getOne = async (req, res) => {
  const { id } = req.params;

  // Validar que el ID tenga formato válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const item = await Sucursal.findById(id);
    if (!item) {
      return res.status(404).json({ mensaje: 'No encontrado' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva sucursal
exports.createOne = async (req, res) => {
  try {
    const item = new Sucursal(req.body);
    const result = await item.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Crear varias sucursales
exports.createMany = async (req, res) => {
  try {
    const result = await Sucursal.insertMany(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar una sucursal por ID
exports.updateOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await Sucursal.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar múltiples sucursales
exports.updateMany = async (req, res) => {
  const { filtro, datos } = req.body;
  try {
    const result = await Sucursal.updateMany(filtro, { $set: datos });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una sucursal por ID
exports.deleteOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await Sucursal.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar múltiples sucursales
exports.deleteMany = async (req, res) => {
  try {
    const result = await Sucursal.deleteMany(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
