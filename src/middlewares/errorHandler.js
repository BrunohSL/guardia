// Middleware para tratamento global de erros
const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado:', err.message);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
