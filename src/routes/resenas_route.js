const express = require('express');
const router = express.Router();
const controller = require('../controller/resenascontroller');

router.post(   '/bulk-create',  controller.createMany);
router.put(    '/bulk-update',  controller.updateMany);
router.delete( '/bulk-delete',  controller.deleteMany);
router.get(    '/',             controller.getAll);
router.post(   '/',             controller.createOne);
router.get(    '/:id',          controller.getOne);
router.put(    '/:id',          controller.updateOne);
router.delete( '/:id',          controller.deleteOne);

module.exports = router;
