const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const webhookRoutes = require('./routes/webhookRoutes');
const integrationRoutes = require('./routes/integrationRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));
app.use((req, res, next) => {
  if (typeof req.body === 'string') {
    req.rawBody = req.body;
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      // Mantém como string se não for JSON
    }
  }
  next();
});
app.use(logger);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas da aplicação
app.use('/', webhookRoutes);
app.use('/api', integrationRoutes);
app.use('/api', eventRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;
