const app = require('./app');
const { port } = require('./config/env');

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📍 Endpoint: http://localhost:${port}/webhook`);
  console.log(`💚 Health check: http://localhost:${port}/health`);
});
