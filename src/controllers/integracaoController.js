const integracaoService = require('../services/integracaoService');

class IntegracaoController {
  async create(req, res) {
    try {
      const integracao = await integracaoService.create(req.body);
      res.status(201).json(integracao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const integracoes = await integracaoService.findAll();
      res.json(integracoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const integracao = await integracaoService.findById(req.params.id);
      res.json(integracao);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const integracao = await integracaoService.update(req.body.id, req.body);
      res.json(integracao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await integracaoService.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new IntegracaoController();
