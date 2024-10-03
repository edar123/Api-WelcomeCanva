const express = require('express');
const router = express.Router();
const canvasController = require('../controllers/normalWelcomeController');
const cuteWelcomeController = require('../controllers/cuteWelcomeController'); // Asegúrate de que el nombre sea consistente

// Ruta para generar la imagen de bienvenida normal
router.get('/generate-welcome', canvasController.generateWelcomeImage);

// Ruta para generar la imagen de bienvenida "cute"
router.get('/cute-welcome', cuteWelcomeController.generateCuteWelcomeImage); // Llama a la función adecuada

module.exports = router;
