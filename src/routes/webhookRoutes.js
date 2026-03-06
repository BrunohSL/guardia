const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

// Rota principal do webhook
router.post('/webhook', webhookController.handleWebhook.bind(webhookController));

module.exports = router;
