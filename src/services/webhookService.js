const https = require('https');
const http = require('http');
const { URL } = require('url');
const { n8nWebhookUrl } = require('../config/env');

class WebhookService {
  formatWebhookData(body, query) {
    const contacts = Array.isArray(body) ? body : [];

    const formatted = {
      ocurrence_id: query.ocorrencia || '',
      endereco: decodeURIComponent(query.endereco || ''),
      cuc: 'TST',
      descricao: 'Teste',
      tipo_evento: 'Teste tipo evento',
      contact_id: 'HE60'
    };

    // Adiciona até 3 contatos
    contacts.forEach((contact, index) => {
      const num = index + 1;
      if (num <= 3) {
        formatted[`nome${num}`] = contact.name || '';
        formatted[`telefone${num}`] = contact.phone01 || '';
      }
    });

    return formatted;
  }

  async processAndForward(body, query) {
    if (!n8nWebhookUrl) {
      throw new Error('N8N_WEBHOOK_URL não configurada');
    }

    const data = this.formatWebhookData(body, query);
    console.log('Dados formatados para N8N:', JSON.stringify(data, null, 2));

    return new Promise((resolve, reject) => {
      const url = new URL(n8nWebhookUrl);
      const postData = JSON.stringify(data);

      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 60000
      };

      const protocol = url.protocol === 'https:' ? https : http;
      const req = protocol.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => {
          console.log('=== RESPOSTA DO N8N ===');
          console.log('Status:', res.statusCode);
          console.log('Headers:', JSON.stringify(res.headers, null, 2));
          console.log('Body:', responseData);
          console.log('=======================');

          resolve({
            success: true,
            n8nResponse: responseData,
            statusCode: res.statusCode
          });
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Falha ao enviar para N8N: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout ao enviar para N8N'));
      });

      req.write(postData);
      req.end();
    });
  }

  async receiveFromN8N(data) {
    console.log('=== RESPOSTA DO N8N RECEBIDA ===');
    console.log('Dados:', JSON.stringify(data, null, 2));
    console.log('================================');

    // Aqui você vai implementar a lógica de atualizar a ocorrência
    // e chamar o endpoint de close do sigma

    return {
      success: true,
      message: 'Dados recebidos do N8N com sucesso'
    };
  }
}

module.exports = new WebhookService();
