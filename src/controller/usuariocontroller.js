const Usuario = require('../models/Usuario');

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.rol) filtro.rol = req.query.rol;
    if (req.query.activo) filtro.activo = req.query.activo === 'true';

    const campos = req.query.proyeccion ? req.query.proyeccion.split(',').join(' ') : null;
    const orden = req.query.orden ? JSON.parse(req.query.orden) : {};
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;

    const items = await Usuario.find(filtro, campos).sort(orden).skip(skip).limit(limit);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Usuario.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOne = async (req, res) => {
  try {
    const item = new Usuario(req.body);
    const result = await item.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createMany = async (req, res) => {
  try {
    const result = await Usuario.insertMany(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const result = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMany = async (req, res) => {
  const { filtro, datos } = req.body;
  try {
    const result = await Usuario.updateMany(filtro, { $set: datos });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const result = await Usuario.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMany = async (req, res) => {
  try {
    const result = await Usuario.deleteMany(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
