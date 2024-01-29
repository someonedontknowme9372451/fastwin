const mongoose = require('mongoose');

const parityRecordSchema = new mongoose.Schema({
    color: { type: String, required: true },
    number: { type: String, required: true },
    period: { type: String, required: true },
    time: { type: String, required: true }
  });

  const parityRecordModel = mongoose.model('ParityRecord', parityRecordSchema);

  module.exports = parityRecordModel