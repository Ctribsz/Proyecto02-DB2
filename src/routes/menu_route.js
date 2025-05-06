const express = require('express');
const router = express.Router();
const controller = require('../controller/menucontroller');

router.post(  '/bulk-create',  controller.bulkCreateMenu);
router.put(   '/bulk-update',  controller.bulkUpdateMenu);
router.delete('/bulk-delete',  controller.bulkDeleteMenu);
router.get(   '/',              controller.getAll);
router.post(  '/',              controller.createOne);
router.get(   '/:id',          controller.getOne);
router.put(   '/:id',          controller.updateOne);
router.delete('/:id',          controller.deleteOne);

module.exports = router;