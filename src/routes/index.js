// src/routes/index.js

const router = require('express').Router();
const mongoose = require('mongoose');

// const LOOT = [
//   {id: '1', name: 'Glaive', value: '20.00'},
//   {id: '2', name: 'Battleaxe', value: '10.00'},
//   {id: '3', name: 'Clothes, fine', value: '15.00'},
//   {id: '4', name: 'Torch', value: '0.01'},
// ];

router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

module.exports = router;

router.get('/loot', function(req, res, next) {
  mongoose.model('Item').find({}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(items);
  });
});

router.post('/loot', function(req, res, next) {
  const newId = '' + LOOT.length;
  const data = req.body;
  data.id = newId;

  LOOT.push(data);
  res.status(201).json(data);
});

router.put('/loot/:itemId', function(req, res, next) {
  const {itemId} = req.params;
  const item = LOOT.find(entry => entry.id === itemId);
  if (!item) {
    return res.status(404).end(`Could not find item '$(itemId)'`);
  }

  item.name = req.body.name;
  item.value = req.body.value;
  res.json(item);
});

router.delete('/loot/:itemId', function(req, res, next) {
  res.end(`Deleting loot '${req.params.itemId}'`);
});

router.get('/loot/:itemId', function(req, res, next) {
  const {itemId} = req.params;

  const item = LOOT.find(entry => entry.id === itemId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(item);
});
