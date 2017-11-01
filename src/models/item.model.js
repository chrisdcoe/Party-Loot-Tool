// Load mongoose package

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  value: Number,
  created_at: {type: Date, default: Date.now},
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;

Item.count({}, function(err, count) {
  if (err) {
    throw err;
  }
  if (count > 0) return;
  const items = require('./item.seed.json');
  Item.create(items, function(err, newItems) {
    if (err) {
      throw err;
    }
    console.log("DB seeded");
  });
});
