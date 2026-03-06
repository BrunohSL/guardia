const Integracao = require('../models/Integracao');

class IntegracaoService {
  async create(data) {
    const { nome, url } = data;

    if (!nome || !url) {
      throw new Error('Nome e URL são obrigatórios');
    }

    const integracao = await Integracao.create({ nome, url });
    return integracao;
  }

  async findAll() {
    return await Integracao.findAll();
  }

  async findById(id) {
    const integracao = await Integracao.findByPk(id);
    if (!integracao) {
      throw new Error('Integração não encontrada');
    }
    return integracao;
  }

  async update(id, data) {
    const integracao = await this.findById(id);
    await integracao.update(data);
    return integracao;
  }

  async delete(id) {
    const integracao = await this.findById(id);
    await integracao.destroy();
    return { message: 'Integração removida com sucesso' };
  }
}

module.exports = new IntegracaoService();
