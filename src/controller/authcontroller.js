const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Función auxiliar para encriptar contraseña
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Función auxiliar para comparar contraseñas
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Login
const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    if (!usuario.activo) {
      return res.status(403).json({ mensaje: 'Usuario inactivo. Contacta al administrador.' });
    }

    const passwordValida = await comparePassword(contraseña, usuario.contraseña);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Registro
const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, telefono, direccion, rol } = req.body;

    // Verificar si ya existe
    const existente = await Usuario.findOne({ correo });
    let direccionObj = req.body.direccion;

    // Si es string, convertirlo a objeto
    if (typeof direccionObj === 'string') {
      const [calle, zonaRaw, municipio] = direccionObj.split(',').map(p => p.trim());
      direccionObj = {
        calle,
        zona: parseInt(zonaRaw?.replace(/\D/g, '')) || 0,
        municipio
      };
    }

    if (existente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    const contraseñaEncriptada = await hashPassword(contraseña);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaEncriptada,
      telefono,
      direccion: direccionObj,
      rol
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

module.exports = { login, register };
