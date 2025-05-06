const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  categoria: {
    type: String,
    enum: ['Entradas', 'Bebidas', 'Plato fuerte', 'Postres'],
    required: true,
  },
  disponible: { type: Boolean, default: true },
  ingredientes: [String],
  fechaCreacion: { type: Date, default: Date.now },
  vegana: { type: Boolean, default: false }
});

module.exports = mongoose.model('Menu', MenuSchema,'menu');
