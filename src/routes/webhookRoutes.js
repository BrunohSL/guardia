const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

// Rota principal do webhook
router.post('/webhook', webhookController.handleWebhook.bind(webhookController));

// Rota para receber resposta do N8N
router.post('/n8n-response', webhookController.handleN8NResponse.bind(webhookController));

module.exports = router;
