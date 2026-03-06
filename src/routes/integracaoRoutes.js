const express = require('express');
const integracaoController = require('../controllers/integracaoController');

const router = express.Router();

router.post('/integracoes', integracaoController.create.bind(integracaoController));
router.get('/integracoes', integracaoController.findAll.bind(integracaoController));
router.get('/integracoes/:id', integracaoController.findById.bind(integracaoController));
router.put('/integracoes', integracaoController.update.bind(integracaoController));
router.delete('/integracoes', integracaoController.delete.bind(integracaoController));

module.exports = router;
