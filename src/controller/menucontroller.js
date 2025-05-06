const Menu = require('../models/Menu');

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.categoria) filtro.categoria = req.query.categoria;
    if (req.query.disponible) filtro.disponible = req.query.disponible === 'true';

    const campos = req.query.proyeccion ? req.query.proyeccion.split(',').join(' ') : null;
    const orden = req.query.orden ? JSON.parse(req.query.orden) : {};
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;

    const items = await Menu.find(filtro, campos).sort(orden).skip(skip).limit(limit);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOne = async (req, res) => {
  try {
    const item = new Menu(req.body);
    const result = await item.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.bulkCreateMenu = async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'El body debe ser un array de platillos y no puede estar vacío' });
  }

  try {
    const docs = await Menu.insertMany(items, { ordered: false });
    return res.status(201).json({
      insertedCount: docs.length,
      insertedIds: docs.map(d => d._id)
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const result = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.bulkUpdateMenu = async (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'El body debe ser un array de objetos {filter, data}' });
  }

  const ops = updates.map(({ filter, data, upsert = false }) => ({
    updateOne: {
      filter,
      update: { $set: data },
      upsert
    }
  }));

  try {
    const result = await Menu.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const result = await Menu.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkDeleteMenu = async (req, res) => {
  const filters = req.body;
  if (!Array.isArray(filters) || filters.length === 0) {
    return res.status(400).json({ error: 'El body debe ser un array de filtros' });
  }

  const ops = filters.map(filter => ({
    deleteOne: { filter }
  }));

  try {
    const result = await Menu.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
