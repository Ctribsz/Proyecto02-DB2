const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: {
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    zona: { type: Number, required: true },
  },
  telefono: { type: String, required: true },
  horario: { type: String, default: '8:00 - 22:00' },
  fecha_apertura: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sucursal', SucursalSchema);
