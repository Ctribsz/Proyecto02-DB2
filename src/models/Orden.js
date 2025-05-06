const mongoose = require('mongoose');

const PlatilloSchema = new mongoose.Schema({
  platilloId: { type: mongoose.Schema.Types.ObjectId, required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true }
}, { _id: false });

const OrdenSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  sucursalId: { type: mongoose.Schema.Types.ObjectId, required: true },
  platillos: { type: [PlatilloSchema], required: true },
  estado: {
    type: String,
    enum: ['pendiente', 'preparando', 'en camino', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  metodoPago: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'transferencia', 'app'],
    required: true
  },
  fecha: { type: Date, default: Date.now },
  notas: { type: String }
});

module.exports = mongoose.model('Ordenes', OrdenSchema);
