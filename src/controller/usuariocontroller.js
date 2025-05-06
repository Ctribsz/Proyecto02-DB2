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


exports.bulkCreate = async (req, res) => {
  let usuarios = req.body;
  if (req.body.create && Array.isArray(req.body.create)) {
    usuarios = req.body.create;
  }
  if (!Array.isArray(usuarios) || usuarios.length === 0) {
    return res.status(400).json({
      error: 'El cuerpo de la petición debe ser un array de usuarios y no puede estar vacío'
    });
  }
  try {
    // 3) Insertar
    const docs = await Usuario.insertMany(usuarios, { ordered: false });
    return res.status(201).json({
      insertedCount: docs.length,
      insertedIds:    docs.map(u => u._id)
    });
  } catch (err) {
    console.error('🚨 bulkCreate error:', err);
    return res.status(500).json({ error: err.message });
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

exports.bulkUpdate = async (req, res) => {
  const updates = req.body;   // esperamos un array de { filter, data, upsert? }
  const ops = updates.map(({ filter, data, upsert = false }) => ({
    updateOne: {
      filter,
      update: { $set: data },
      upsert
    }
  }));

  try {
    const result = await Usuario.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
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

exports.bulkDelete = async (req, res) => {
  const filters = req.body;
  const ops = filters.map(filter => ({
    deleteOne: { filter }
  }));

  try {
    const result = await Usuario.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
