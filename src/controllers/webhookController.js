const webhookService = require('../services/webhookService');

// Controller responsável por receber requisições e delegar ao service
class WebhookController {
  async handleWebhook(req, res, next) {
    try {
      console.log('=== WEBHOOK RECEBIDO ===');
      console.log('Headers:', JSON.stringify(req.headers, null, 2));
      console.log('Body:', JSON.stringify(req.body, null, 2));
      console.log('Raw Body:', req.rawBody);
      console.log('Query:', JSON.stringify(req.query, null, 2));
      console.log('========================');

      let data = req.body;

      // Se o body estiver vazio mas tiver rawBody, tenta parsear
      if ((!data || Object.keys(data).length === 0) && req.rawBody) {
        try {
          data = JSON.parse(req.rawBody);
        } catch (e) {
          console.log('Erro ao parsear rawBody:', e.message);
        }
      }

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Body vazio ou inválido'
        });
      }

      const result = await webhookService.processAndForward(data, req.query);

      res.status(200).json({
        success: true,
        message: 'Webhook processado e enviado com sucesso',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async handleN8NResponse(req, res, next) {
    try {
      console.log('=== RESPOSTA N8N RECEBIDA ===');
      console.log('Headers:', JSON.stringify(req.headers, null, 2));
      console.log('Body:', JSON.stringify(req.body, null, 2));
      console.log('Query:', JSON.stringify(req.query, null, 2));
      console.log('=============================');

      const result = await webhookService.receiveFromN8N(req.body);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WebhookController();
