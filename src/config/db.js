const mongoose = require('mongoose');
const Sucursal = require('../models/Sucursal');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Lab08' 
    });

    console.log('🟢 Conectado a MongoDB Atlas');
    console.log('📛 Base de datos conectada:', mongoose.connection.name);

  } catch (error) {
    console.error('🔴 Error al conectar:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
