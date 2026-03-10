const https = require('https');
const http = require('http');
const { URL } = require('url');
const { n8nWebhookUrl } = require('../config/env');
const WebhookHistory = require('../models/WebhookHistory');
const Occurrence = require('../models/Occurrence');
const OccurrenceHistory = require('../models/OccurrenceHistory');
const sigmaService = require('./sigmaService');
const { OCCURRENCE_STATUS, ALARM_CAUSES } = require('../config/sigmaConstants');

class WebhookService {
  decodeText(text) {
    if (!text) return '';
    try {
      // Primeiro decodifica URL encoding
      let decoded = decodeURIComponent(text);
      // Depois decodifica HTML entities se houver
      decoded = decoded
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&aacute;/g, 'á')
        .replace(/&agrave;/g, 'à')
        .replace(/&acirc;/g, 'â')
        .replace(/&atilde;/g, 'ã')
        .replace(/&eacute;/g, 'é')
        .replace(/&egrave;/g, 'è')
        .replace(/&ecirc;/g, 'ê')
        .replace(/&iacute;/g, 'í')
        .replace(/&igrave;/g, 'ì')
        .replace(/&icirc;/g, 'î')
        .replace(/&oacute;/g, 'ó')
        .replace(/&ograve;/g, 'ò')
        .replace(/&ocirc;/g, 'ô')
        .replace(/&otilde;/g, 'õ')
        .replace(/&uacute;/g, 'ú')
        .replace(/&ugrave;/g, 'ù')
        .replace(/&ucirc;/g, 'û')
        .replace(/&ccedil;/g, 'ç')
        .replace(/&Aacute;/g, 'Á')
        .replace(/&Agrave;/g, 'À')
        .replace(/&Acirc;/g, 'Â')
        .replace(/&Atilde;/g, 'Ã')
        .replace(/&Eacute;/g, 'É')
        .replace(/&Egrave;/g, 'È')
        .replace(/&Ecirc;/g, 'Ê')
        .replace(/&Iacute;/g, 'Í')
        .replace(/&Igrave;/g, 'Ì')
        .replace(/&Icirc;/g, 'Î')
        .replace(/&Oacute;/g, 'Ó')
        .replace(/&Ograve;/g, 'Ò')
        .replace(/&Ocirc;/g, 'Ô')
        .replace(/&Otilde;/g, 'Õ')
        .replace(/&Uacute;/g, 'Ú')
        .replace(/&Ugrave;/g, 'Ù')
        .replace(/&Ucirc;/g, 'Û')
        .replace(/&Ccedil;/g, 'Ç');
      return decoded;
    } catch (e) {
      return text;
    }
  }
  formatWebhookData(body, query) {
    const contacts = Array.isArray(body) ? body : [];

    const formatted = {
      ocurrence_id: query.ocorrencia || '',
      endereco: this.decodeText(query.endereco || ''),
      cuc: 'TST', // Buscar no sistema do sigma a partir do contact_id ou talvez criar a tabela de cuc e contact_id do nosso lado
      descricao: this.decodeText(query.descricaoevento || ''),
      tipo_evento: this.decodeText(query.descricaoevento || ''),
      contact_id: query.codigoevento || ''
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

  async saveWebhookHistory(body, query) {
    try {
      const historyData = {
        account_id: parseInt(query.idconta) || null,
        company_id: parseInt(query.idempresa) || null,
        address: this.decodeText(query.endereco || ''),
        event_description: this.decodeText(query.descricaoevento || ''),
        webhook_id: query.webhookId || '',
        occurrence_id: query.ocorrencia || ''
      };

      const history = await WebhookHistory.create(historyData);
      console.log('Histórico salvo:', history.id);
      return history;
    } catch (error) {
      console.error('Erro ao salvar histórico:', error.message);
      throw error;
    }
  }

  async createOrUpdateOccurrence(occurrenceId) {
    try {
      // Verifica se a ocorrência já existe
      let occurrence = await Occurrence.findOne({ where: { occurrence_id: occurrenceId } });

      if (!occurrence) {
        // Cria nova ocorrência com status OPEN
        occurrence = await Occurrence.create({
          occurrence_id: occurrenceId,
          status: OCCURRENCE_STATUS.OPEN
        });

        // Cria histórico inicial
        await OccurrenceHistory.create({
          occurrence_id: occurrenceId,
          previous_status: null,
          current_status: OCCURRENCE_STATUS.OPEN,
          message: null
        });

        // Atualiza status no Sigma para STARTED
        await sigmaService.updateOccurrenceStatus(occurrenceId, OCCURRENCE_STATUS.STARTED);

        // Atualiza status local e cria histórico
        occurrence.status = OCCURRENCE_STATUS.STARTED;
        await occurrence.save();

        await OccurrenceHistory.create({
          occurrence_id: occurrenceId,
          previous_status: OCCURRENCE_STATUS.OPEN,
          current_status: OCCURRENCE_STATUS.STARTED,
          message: null
        });

        console.log('Ocorrência criada e iniciada:', occurrenceId);
      }

      return occurrence;
    } catch (error) {
      console.error('Erro ao criar/atualizar ocorrência:', error.message);
      throw error;
    }
  }

  async processAndForward(body, query) {
    if (!n8nWebhookUrl) {
      throw new Error('N8N_WEBHOOK_URL não configurada');
    }

    // Salva no histórico
    await this.saveWebhookHistory(body, query);

    // Cria ou atualiza ocorrência
    await this.createOrUpdateOccurrence(query.ocorrencia);

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

    const { ocurrence_id, message } = data;

    if (!ocurrence_id || !message) {
      throw new Error('ocurrence_id e message são obrigatórios');
    }

    try {
      // Adiciona log na ocorrência no Sigma
      await sigmaService.addOccurrenceLog(ocurrence_id, message);
      console.log('Log adicionado na ocorrência:', ocurrence_id);

      // Fecha a ocorrência no Sigma
      await sigmaService.closeOccurrence(ocurrence_id, ALARM_CAUSES.OTHERS);
      console.log('Ocorrência fechada:', ocurrence_id);

      // Atualiza status local
      const occurrence = await Occurrence.findOne({ where: { occurrence_id: ocurrence_id } });
      if (occurrence) {
        const previousStatus = occurrence.status;
        occurrence.status = OCCURRENCE_STATUS.CLOSED;
        await occurrence.save();

        // Cria histórico
        await OccurrenceHistory.create({
          occurrence_id: ocurrence_id,
          previous_status: previousStatus,
          current_status: OCCURRENCE_STATUS.CLOSED,
          message: message
        });
      }

      return {
        success: true,
        message: 'Ocorrência finalizada com sucesso'
      };
    } catch (error) {
      console.error('Erro ao processar resposta do N8N:', error.message);
      throw error;
    }
  }
}

module.exports = new WebhookService();
