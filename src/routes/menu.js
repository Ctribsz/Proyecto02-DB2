const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');


router.post('/', async (req, res) => {
  try {
    const nuevo = new Menu(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const platillo = await Menu.findById(req.params.id);
    if (!platillo) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(platillo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Menu.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Platillo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
