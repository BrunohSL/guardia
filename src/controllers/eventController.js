const eventService = require('../services/eventService');

class EventController {
  async create(req, res) {
    try {
      const event = await eventService.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const events = await eventService.findAll();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const event = await eventService.findById(req.params.id);
      res.json(event);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const event = await eventService.update(req.body.id, req.body);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await eventService.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new EventController();
