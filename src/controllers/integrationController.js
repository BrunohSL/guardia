const integrationService = require('../services/integrationService');

class IntegrationController {
  async create(req, res) {
    try {
      const integration = await integrationService.create(req.body);
      res.status(201).json(integration);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const integrations = await integrationService.findAll();
      res.json(integrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const integration = await integrationService.findById(req.params.id);
      res.json(integration);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const integration = await integrationService.update(req.body.id, req.body);
      res.json(integration);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await integrationService.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new IntegrationController();
