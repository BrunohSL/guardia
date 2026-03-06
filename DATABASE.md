# Guardia Q - Sistema de Webhooks

## Configuração do Banco de Dados

### Subir o ambiente

```bash
docker-compose up -d
```

### Rodar migrations

```bash
# Rodar todas as migrations
npm run migrate

# Desfazer última migration
npm run migrate:undo

# Resetar todas as migrations
npm run migrate:reset
```

### Criar nova migration

```bash
npx sequelize-cli migration:generate --name nome-da-migration
```

### Variáveis de Ambiente

Adicione no `.env`:

```
PORT=3000
N8N_WEBHOOK_URL=https://webhook.site/seu-id

DB_HOST=localhost
DB_PORT=3306
DB_NAME=guardia
DB_USER=root
DB_PASSWORD=root
```

## Estrutura do Banco

- **integracoes**: Sistemas de segurança integrados
- **eventos**: Códigos de eventos dos equipamentos
- **ocorrencias**: Ocorrências recebidas via webhook
- **contas**: Clientes/empresas
- **contas_eventos**: Eventos ativos por conta
- **ocorrencias_historico**: Histórico de mudanças de status
