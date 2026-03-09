const Event = require('../models/Event');

class EventService {
  async create(data) {
    const { event_contact_id, integration_id, cuc, name, event_type } = data;

    if (!event_contact_id) {
      throw new Error('Código do evento é obrigatório');
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
