const Evento = require('../models/Evento');

class EventoService {
  async create(data) {
    const { codigo_evento, nome, descricao } = data;

    if (!codigo_evento) {
      throw new Error('Código do evento é obrigatório');
    }

    const evento = await Evento.create({ codigo_evento, nome, descricao });
    return evento;
  }

  async findAll() {
    return await Evento.findAll();
  }

  async findById(id) {
    const evento = await Evento.findByPk(id);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    return evento;
  }

  async findByCodigo(codigo_evento) {
    const evento = await Evento.findOne({ where: { codigo_evento } });
    if (!evento) {
      throw new Error('Evento não encontrado');
    }
    return evento;
  }

  async update(id, data) {
    const evento = await this.findById(id);
    await evento.update(data);
    return evento;
  }

  async delete(id) {
    const evento = await this.findById(id);
    await evento.destroy();
    return { message: 'Evento removido com sucesso' };
  }
}

module.exports = new EventoService();
