const express = require('express');
const app = express();
const port = 4737;

const canvasRoutes = require('./src/routes/canvas');
const cuteWelcomeRouter = require('./src/routes/canvas'); // Nueva ruta

app.use('/canvas', canvasRoutes);

app.listen(port, () => {
  console.log(`Canvas API listening at http://localhost:${port}`);
});
