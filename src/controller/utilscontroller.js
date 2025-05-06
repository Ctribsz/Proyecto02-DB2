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


exports.sortAsc = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const campo = req.query.campo;

    if (!campo) return res.status(400).json({ error: 'Debes proporcionar un campo en la query (?campo=)' });

    // Obtener el tipo del campo desde el schema
    const schemaType = Model.schema.path(campo);
    if (!schemaType || schemaType.instance !== 'Number') {
      return res.status(400).json({ error: `El campo '${campo}' no es de tipo Number` });
    }

    const documentos = await Model.find().sort({ [campo]: 1 });
    res.json(documentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sortDesc = async (req, res) => {
  try {
    const Model = getModel(req.params.coleccion);
    const campo = req.query.campo;

    if (!campo) return res.status(400).json({ error: 'Debes proporcionar un campo en la query (?campo=)' });

    const schemaType = Model.schema.path(campo);
    if (!schemaType || schemaType.instance !== 'Number') {
      return res.status(400).json({ error: `El campo '${campo}' no es de tipo Number` });
    }

    const documentos = await Model.find().sort({ [campo]: -1 });
    res.json(documentos);
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
