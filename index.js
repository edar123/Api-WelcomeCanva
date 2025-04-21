const express = require('express');
const app = express();
const path = require('path');
const port = 4737;

const canvasRoutes = require('./src/routes/canvas');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/canvas', canvasRoutes);

app.listen(port, () => {
  console.log(`Canvas API listening at http://localhost:${port}`);
});
