const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: {
    calle: String,
    zona: Number,
    municipio: String,
  },
  rol: { type: String, enum: ['cliente', 'admin', 'repartidor'], required: true },
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
