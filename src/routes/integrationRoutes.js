const express = require('express');
const integrationController = require('../controllers/integrationController');

const router = express.Router();

router.post('/integrations', integrationController.create.bind(integrationController));
router.get('/integrations', integrationController.findAll.bind(integrationController));
router.get('/integrations/:id', integrationController.findById.bind(integrationController));
router.put('/integrations', integrationController.update.bind(integrationController));
router.delete('/integrations', integrationController.delete.bind(integrationController));

module.exports = router;
