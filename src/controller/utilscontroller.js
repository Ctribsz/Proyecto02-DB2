const mongoose = require('mongoose');

// Obtener el modelo dinámicamente
function getModel(collectionName) {
  try {
    return mongoose.model(collectionName);
  } catch (err) {
    throw new Error(`Modelo '${collectionName}' no registrado`);
  }
}

exports.count = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const resultado = await Model.countDocuments(req.query);
    res.json({ total: resultado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.distinct = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const resultado = await Model.distinct(req.query.campo);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aggregate = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const resultado = await Model.aggregate(req.body);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pushToArray = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const result = await Model.findByIdAndUpdate(
      req.params.id,
      { $push: req.body },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pullFromArray = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const result = await Model.findByIdAndUpdate(
      req.params.id,
      { $pull: req.body },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
