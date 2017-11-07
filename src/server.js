// src/server.js

// Requires
const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');

// Connect to MongoDB
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`, {
  useMongoClient: true
});

// Import models
require('./models/item.model.js');

// Utilize Node.js Express framework
const app = express();

// Serving static files
const publicPath = path.resolve(__dirname, './public');

app.use(bodyParser.json());

app.use(express.static(publicPath));
app.use('/api', router);

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
