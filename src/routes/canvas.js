const express = require('express');
const router = express.Router();
const canvasController = require('../controllers/canvasController');

router.get('/generate-welcome', canvasController.generateWelcomeImage);

module.exports = router;
