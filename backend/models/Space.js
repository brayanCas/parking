const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
