const express = require('express');
const eventoController = require('../controllers/eventoController');

const router = express.Router();

router.post('/eventos', eventoController.create.bind(eventoController));
router.get('/eventos', eventoController.findAll.bind(eventoController));
router.get('/eventos/:id', eventoController.findById.bind(eventoController));
router.put('/eventos', eventoController.update.bind(eventoController));
router.delete('/eventos', eventoController.delete.bind(eventoController));

module.exports = router;
