const webhookService = require('../services/webhookService');

// Controller responsável por receber requisições e delegar ao service
class WebhookController {
  async handleWebhook(req, res, next) {
    try {
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Body vazio ou inválido'
        });
      }

      const result = await webhookService.processAndForward(data);

      res.status(200).json({
        success: true,
        message: 'Webhook processado e enviado com sucesso',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WebhookController();
