const express = require('express');
const router = express.Router();
const controller = require('../controller/ordencontroller');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.createOne);
router.post('/batch', controller.createMany);
router.put('/:id', controller.updateOne);
router.put('/batch', controller.updateMany);
router.delete('/:id', controller.deleteOne);
router.delete('/batch', controller.deleteMany);

module.exports = router;