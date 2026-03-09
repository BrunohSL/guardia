const Integration = require('../models/Integration');

class IntegrationService {
  async create(data) {
    const { nome, url } = data;

    if (!nome || !url) {
      throw new Error('Nome e URL são obrigatórios');
    }

    const integration = await Integration.create({ nome, url });
    return integration;
  }

  async findAll() {
    return await Integration.findAll();
  }

  async findById(id) {
    const integration = await Integration.findByPk(id);
    if (!integration) {
      throw new Error('Integração não encontrada');
    }
    return integration;
  }

  async update(id, data) {
    const integration = await this.findById(id);
    await integration.update(data);
    return integration;
  }

  async delete(id) {
    const integration = await this.findById(id);
    await integration.destroy();
    return { message: 'Integração removida com sucesso' };
  }
}

module.exports = new IntegrationService();
