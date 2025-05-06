const express = require('express');
const router = express.Router();
const controller = require('../controller/ordencontroller');


router.post(  '/bulk-create',  controller.bulkCreate);
router.put(   '/bulk-update',  controller.bulkUpdate);
router.delete('/bulk-delete',  controller.bulkDelete);
router.get(   '/',             controller.getAll);
router.get(   '/:id',          controller.getOne);
router.post(  '/',             controller.createOne);
router.put(   '/:id',          controller.updateOne);
router.delete('/:id',          controller.deleteOne);

module.exports = router;