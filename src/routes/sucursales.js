const express = require('express');
const router = express.Router();
const Sucursal = require('../models/Sucursal');


router.post('/', async (req, res) => {
  try {
    const nueva = new Sucursal(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id);
    if (!sucursal) return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
    res.json(sucursal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Sucursal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Sucursal.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
    res.json({ mensaje: 'Sucursal eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
