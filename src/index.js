const express = require('express');
const app = express();
const port = 3000;

const canvasRoutes = require('./routes/canvas');

app.use('/canvas', canvasRoutes);

app.listen(port, () => {
  console.log(`Canvas API listening at http://localhost:${port}`);
});
