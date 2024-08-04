const express = require('express');
const app = express();
const port = 5357;

const canvasRoutes = require('./routes/canvas');

app.use('/canvas', canvasRoutes);

app.listen(port, () => {
  console.log(`Canvas API listening at http://localhost:${port}`);
});
