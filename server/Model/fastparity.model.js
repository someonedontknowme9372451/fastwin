const mongoose = require('mongoose');

const fastParityRecordSchema = new mongoose.Schema({
    color: { type: String, required: true },
    number: { type: String, required: true },
    period: { type: String, required: true },
    time: { type: String, required: true }
  });

  const fastParityRecordModel = mongoose.model('FastParityRecord', fastParityRecordSchema);

  module.exports = {
    fastParityRecordModel,
  };