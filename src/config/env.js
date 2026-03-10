require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'guardia',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root'
  },
  sigma: {
    baseUrl: process.env.SIGMA_BASE_URL || 'https://beta.segware.io/server/api/v1',
    companyId: process.env.SIGMA_COMPANY_ID || '280',
    bearerToken: process.env.SIGMA_BEARER_TOKEN
  }
};
