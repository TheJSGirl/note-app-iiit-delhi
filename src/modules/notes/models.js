const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { strict: true, timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
