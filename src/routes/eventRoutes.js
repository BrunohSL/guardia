const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/events', eventController.create.bind(eventController));
router.get('/events', eventController.findAll.bind(eventController));
router.get('/events/:id', eventController.findById.bind(eventController));
router.put('/events', eventController.update.bind(eventController));
router.delete('/events', eventController.delete.bind(eventController));

module.exports = router;
