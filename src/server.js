// src/server.js

// Requires
const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`, {
  useMongoClient: true
});

// Import models
require('./models/file.model.js');

// Utilize Node.js Express framework
const app = express();

// Serving static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use('/api', router);

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
