const express = require('express');
const router = express.Router();
const Resena = require('../models/Resena');


router.post('/', async (req, res) => {
  try {
    const nuevaResena = new Resena(req.body);
    const guardada = await nuevaResena.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const resenas = await Resena.find();
    res.json(resenas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id);
    if (!resena) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.json(resena);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Resena.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
