// src/routes/index.js

const router = require('express').Router();
const mongoose = require('mongoose');

module.exports = router;

router.get('/loot', function(req, res, next) {
  mongoose.model('Item').find({}, function(err, items) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(items);
  });
});

router.post('/loot', function(req, res, next) {
  const Item = mongoose.model('Item');
  const itemData = {
    name: req.body.name,
    value: req.body.value,
  };

  Item.create(itemData, function(err, newItem) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newItem);
  });
});

router.put('/loot/:itemId', function(req, res, next) {
  const Item = mongoose.model('Item');
  const itemId = req.params.itemId;

  Item.findById(itemId, function(err, item) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!item) {
      return res.status(404).json({message: "Item not found"});
    }

    item.name = req.body.name;
    item.value = req.body.value;

    item.save(function(err, savedItem) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedItem);
    });
  });
});

router.delete('/loot/:itemId', function(req, res, next) {
  res.end(`Deleting loot '${req.params.itemId}'`);
});

router.get('/loot/:itemId', function(req, res, next) {
  const {itemId} = req.params;

  const item = LOOT.find(entry => entry.id === itemId);
  if (!item) {
    return res.status(404).end(`Could not find item '${itemId}'`);
  }

  res.json(item);
});
