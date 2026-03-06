# Webhook API

API REST para receber webhooks, processar dados e reenviar para N8N.

## 📁 Estrutura do Projeto

```
webhook-api/
├── src/
│   ├── config/          # Configurações (variáveis de ambiente)
│   ├── controllers/     # Controladores (recebem requisições)
│   ├── services/        # Serviços (lógica de negócio)
│   ├── middlewares/     # Middlewares (log, erros)
│   ├── routes/          # Definição de rotas
│   ├── app.js           # Configuração do Express
│   └── server.js        # Inicialização do servidor
├── .env.example         # Exemplo de variáveis de ambiente
├── Dockerfile           # Configuração Docker
├── docker-compose.yml   # Orquestração Docker
├── Makefile             # Comandos facilitados
└── package.json         # Dependências do projeto
```

## 🚀 Como Rodar

### Localmente

1. Clone o repositório e instale as dependências:
```bash
npm install
```

2. Copie o arquivo `.env.example` para `.env` e configure:
```bash
cp .env.example .env
```

3. Edite o `.env` com suas configurações:
```
PORT=3000
N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/seu-endpoint
```

4. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

### Com Docker

1. Configure o arquivo `.env`:
```bash
cp .env.example .env
```

2. Usando Makefile (recomendado):
```bash
make build    # Constrói a imagem
make up       # Sobe o container
make logs     # Visualiza os logs
make down     # Para o container
make restart  # Reinicia o container
make clean    # Remove tudo
```

3. Ou usando docker-compose diretamente:
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```

## 📮 Testando no Postman

### Endpoint Principal

**POST** `http://localhost:3000/webhook`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "event": "user.created",
  "data": {
    "userId": "12345",
    "email": "usuario@exemplo.com",
    "name": "João Silva"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Webhook processado e enviado com sucesso",
  "data": {
    "success": true,
    "n8nResponse": {},
    "statusCode": 200
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "error": "Body vazio ou inválido"
}
```

### Health Check

**GET** `http://localhost:3000/health`

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🏗️ Arquitetura

- **Routes**: Define os endpoints da API
- **Controllers**: Recebe requisições, valida dados e retorna respostas
- **Services**: Contém a lógica de negócio (processamento e envio para N8N)
- **Middlewares**: Funções intermediárias (log, tratamento de erros)
- **Config**: Centraliza configurações e variáveis de ambiente

## 🔮 Evolução Futura

O projeto está preparado para:
- Adicionar autenticação (JWT, API Key)
- Implementar filas (Bull, RabbitMQ)
- Adicionar validação de schemas (Joi, Yup)
- Implementar retry logic
- Adicionar testes automatizados
- Implementar rate limiting

## 📝 Licença

ISC
