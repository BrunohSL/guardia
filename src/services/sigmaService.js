const https = require('https');
const http = require('http');
const { URL } = require('url');
const { sigma } = require('../config/env');
const { ALARM_CAUSES, OCCURRENCE_STATUS } = require('../config/sigmaConstants');

class SigmaService {
  async makeRequest(method, endpoint, data = null) {
    const fullUrl = `${sigma.baseUrl}/${sigma.companyId}${endpoint}`;
    const url = new URL(fullUrl);

    return new Promise((resolve, reject) => {
      const postData = data ? JSON.stringify(data) : null;

      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sigma.bearerToken}`
        },
        timeout: 30000
      };

      if (postData) {
        options.headers['Content-Length'] = Buffer.byteLength(postData);
      }

      const protocol = url.protocol === 'https:' ? https : http;
      const req = protocol.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => {
          console.log(`Sigma API ${method} ${endpoint} - Status: ${res.statusCode}`);

          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              success: true,
              data: responseData ? JSON.parse(responseData) : null,
              statusCode: res.statusCode
            });
          } else {
            reject(new Error(`Sigma API error: ${res.statusCode} - ${responseData}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Falha na requisição Sigma: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição Sigma'));
      });

      if (postData) {
        req.write(postData);
      }
      req.end();
    });
  }

  async updateOccurrenceStatus(occurrenceId, status) {
    const endpoint = `/occurrences/${occurrenceId}/status`;
    return await this.makeRequest('POST', endpoint, { status });
  }

  async addOccurrenceLog(occurrenceId, text) {
    const endpoint = `/occurrences/${occurrenceId}/actions/logs`;
    return await this.makeRequest('POST', endpoint, { text });
  }

  async closeOccurrence(occurrenceId, alarmCauseId = ALARM_CAUSES.OTHERS) {
    const endpoint = `/occurrences/${occurrenceId}/actions/close`;
    return await this.makeRequest('POST', endpoint, { alarmCauseId });
  }
}

module.exports = new SigmaService();
