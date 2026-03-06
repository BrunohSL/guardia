const axios = require('axios');
const { n8nWebhookUrl } = require('../config/env');

// Serviço responsável pela lógica de negócio do webhook
class WebhookService {
  async processAndForward(data) {
    if (!n8nWebhookUrl) {
      throw new Error('N8N_WEBHOOK_URL não configurada');
    }

    console.log('Dados recebidos:', JSON.stringify(data, null, 2));
    console.log('URL do webhook:', n8nWebhookUrl);

    try {
      const response = await axios.post(n8nWebhookUrl, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000
      });

      console.log('Dados enviados para N8N com sucesso');

      return {
        success: true,
        n8nResponse: response.data,
        statusCode: response.status
      };
    } catch (error) {
      console.error('Erro ao enviar para N8N:', error.message);
      console.error('Detalhes do erro:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error(`Falha ao enviar para N8N: ${error.message}`);
    }
  }
}

module.exports = new WebhookService();
