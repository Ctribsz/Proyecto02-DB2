const express = require('express');
const router = express.Router();
const Orden = require('../models/Orden');


router.post('/', async (req, res) => {
  try {
    const nuevaOrden = new Orden(req.body);
    const guardada = await nuevaOrden.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const ordenes = await Orden.find();
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) return res.status(404).json({ mensaje: 'Orden no encontrada' });
    res.json(orden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: 'Orden no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Orden.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Orden no encontrada' });
    res.json({ mensaje: 'Orden eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
