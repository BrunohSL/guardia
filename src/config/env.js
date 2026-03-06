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
  }
};
