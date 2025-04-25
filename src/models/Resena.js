const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mensaje: { type: String, required: true },
  fechaRespuesta: { type: Date, default: Date.now }
}, { _id: false });

const ResenaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  ordenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden', required: true },
  calificacion: { type: Number, min: 1, max: 5, required: true },
  comentario: { type: String },
  fecha: { type: Date, default: Date.now },
  respuestas: [RespuestaSchema]
});

module.exports = mongoose.model('Resena', ResenaSchema);
