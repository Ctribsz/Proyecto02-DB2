const express = require('express');
const router = express.Router();
const controller = require('../controller/usuariocontroller');

router.get(   '/',             controller.getAll);
router.post(  '/',             controller.createOne);
router.post(  '/bulk-create',  controller.bulkCreate);
router.put(   '/bulk-update',  controller.bulkUpdate);
router.delete('/bulk-delete',  controller.bulkDelete);
router.get(   '/:id',          controller.getOne);
router.put(   '/:id',          controller.updateOne);
router.delete('/:id',          controller.deleteOne);


module.exports = router;