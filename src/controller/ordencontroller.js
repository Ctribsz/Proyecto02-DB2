const Orden = require('../models/Orden');

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;
    if (req.query.metodoPago) filtro.metodoPago = req.query.metodoPago;

    const campos = req.query.proyeccion ? req.query.proyeccion.split(',').join(' ') : null;
    const orden = req.query.orden ? JSON.parse(req.query.orden) : {};
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;

    const items = await Orden.find(filtro, campos).sort(orden).skip(skip).limit(limit);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Orden.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOne = async (req, res) => {
  try {
    const item = new Orden(req.body);
    const result = await item.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// controller/ordenController.js
exports.bulkCreate = async (req, res) => {
  // 1) Datos que llegan
  console.log('▶ bulkCreate raw body:', JSON.stringify(req.body, null, 2));
  const orders = Array.isArray(req.body.orders) ? req.body.orders : req.body;
  console.log('▶ bulkCreate parsed orders:', orders);

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ error: 'Body debe ser un array de órdenes' });
  }

  try {
    // 2) Prueba con rawResult para ver conteos y errores internos
    const rawResult = await Orden.insertMany(orders, {
      ordered: false,
      rawResult: true   // <—— aquí
    });
    console.log('🚀 bulkCreate rawResult:', rawResult);

    // 3) Prueba usando el driver nativo (sin pasar por validación Mongoose)
    const nativeResult = await Orden.collection.insertMany(orders, { ordered: false });
    console.log('🚀 native insertMany result:', nativeResult);

    // 4) Envía ambos resultados
    return res.status(201).json({
      mongooseResult: {
        insertedCount: rawResult.insertedCount,
        insertedIds: Object.values(rawResult.insertedIds)
      },
      nativeResult: {
        insertedCount: nativeResult.insertedCount,
        insertedIds: Object.values(nativeResult.insertedIds)
      }
    });
  } catch (err) {
    console.error('🚨 bulkCreate error:', err);
    // 5) Si falla validación, loguea el esquema para ver sus paths
    console.log('📑 Orden.schema paths:', Object.keys(Orden.schema.paths));
    return res.status(500).json({ error: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const result = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.bulkUpdate = async (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'Body debe ser un array de objetos {filter, data}' });
  }

  const ops = updates.map(({ filter, data, upsert = false }) => ({
    updateOne: { filter, update: { $set: data }, upsert }
  }));

  try {
    const result = await Orden.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const result = await Orden.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkDelete = async (req, res) => {
  const filters = req.body;
  if (!Array.isArray(filters) || filters.length === 0) {
    return res.status(400).json({ error: 'Body debe ser un array de filtros' });
  }

  const ops = filters.map(filter => ({ deleteOne: { filter } }));

  try {
    const result = await Orden.bulkWrite(ops, { ordered: false });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};