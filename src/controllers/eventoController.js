const eventoService = require('../services/eventoService');

class EventoController {
  async create(req, res) {
    try {
      const evento = await eventoService.create(req.body);
      res.status(201).json(evento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const eventos = await eventoService.findAll();
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const evento = await eventoService.findById(req.params.id);
      res.json(evento);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const evento = await eventoService.update(req.body.id, req.body);
      res.json(evento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await eventoService.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new EventoController();
