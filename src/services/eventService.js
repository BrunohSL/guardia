const Event = require('../models/Event');
const Integration = require('../models/Integration');

class EventService {
  async create(data) {
    const { event_contact_id, integration_id, cuc, name, event_type } = data;

    if (!event_contact_id) {
      throw new Error('Código do evento é obrigatório');
    }

    if (!integration_id) {
      throw new Error('ID da integração é obrigatório');
    }

    // Verifica se a integração existe
    const integration = await Integration.findByPk(integration_id);
    if (!integration) {
      throw new Error('Integração não encontrada');
    }

    const event = await Event.create({ event_contact_id, integration_id, cuc, name, event_type });
    return event;
  }

  async findAll() {
    return await Event.findAll();
  }

  async findById(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error('Evento não encontrado');
    }
    return event;
  }

  async findByEventContactId(event_contact_id) {
    const event = await Event.findOne({ where: { event_contact_id } });
    if (!event) {
      throw new Error('Evento não encontrado');
    }
    return event;
  }

  async update(id, data) {
    const event = await this.findById(id);
    await event.update(data);
    return event;
  }

  async delete(id) {
    const event = await this.findById(id);
    await event.destroy();
    return { message: 'Evento removido com sucesso' };
  }
}

module.exports = new EventService();
