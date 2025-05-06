const Resena = require('../models/Resena');

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.calificacion) filtro.calificacion = parseInt(req.query.calificacion);

    const campos = req.query.proyeccion ? req.query.proyeccion.split(',').join(' ') : null;
    const orden = req.query.orden ? JSON.parse(req.query.orden) : {};
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;

    const items = await Resena.find(filtro, campos).sort(orden).skip(skip).limit(limit);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Resena.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOne = async (req, res) => {
  try {
    const item = new Resena(req.body);
    const result = await item.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createMany = async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: 'body debe ser un array de reseñas' });

  try {
    const docs = await Resena.insertMany(items, { ordered: false });
    return res.status(201).json({
      insertedCount: docs.length,
      insertedIds:   docs.map(d => d._id)
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const result = await Resena.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMany = async (req, res) => {
  const updates = req.body; 
  if (!Array.isArray(updates) || updates.length === 0)
    return res.status(400).json({ error: 'body debe ser un array de {filter, data}' });

  const ops = updates.map(({ filter, data, upsert = false }) => ({
    updateOne: { filter, update: { $set: data }, upsert }
  }));

  try {
    const result = await Resena.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const result = await Resena.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteMany = async (req, res) => {
  const filters = req.body;
  if (!Array.isArray(filters) || filters.length === 0)
    return res.status(400).json({ error: 'body debe ser un array de filtros' });

  const ops = filters.map(filter => ({ deleteOne: { filter } }));

  try {
    const result = await Resena.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteMany = async (req, res) => {
  const filters = req.body;
  if (!Array.isArray(filters) || filters.length === 0)
    return res.status(400).json({ error: 'body debe ser un array de filtros' });

  const ops = filters.map(filter => ({ deleteOne: { filter } }));

  try {
    const result = await Resena.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};