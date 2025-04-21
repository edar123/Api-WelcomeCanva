const express = require('express');
const router = express.Router();
const canvasController = require('../controllers/normalWelcomeController');
const cuteWelcomeController = require('../controllers/cuteWelcomeController'); 
const cuteCalendarController = require('../controllers/cuteCalendarController'); 

// Rutas de la API
router.get('/generate-welcome', canvasController.generateWelcomeImage);

router.get('/cute-welcome', cuteWelcomeController.generateCuteWelcomeImage);

router.get('/cute-calendar', cuteCalendarController.generateCuteCalendarImage); 

module.exports = router;
