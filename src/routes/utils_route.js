const express = require('express');
const router = express.Router();
const controller = require('../controller/utilscontroller');

router.get('/:coleccion/count', controller.count);
router.get('/:coleccion/distinct', controller.distinct);
router.post('/:coleccion/aggregate', controller.aggregate);
router.put('/:coleccion/push/:id', controller.pushToArray);
router.delete('/:coleccion/pull/:id', controller.pullFromArray);

module.exports = router;
