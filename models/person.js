var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  name: String,
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', PersonSchema);
