// services/fastParityService.js
const FastRecordModel = require('../Model/fastparity.model');

const getColorRecords = async () => {
  try {
    const colorRecords = await FastRecordModel.find().sort({ _id: -1 }).limit(30).lean().exec();
    return colorRecords;
  } catch (err) {
    console.error('Error fetching color records:', err);
    throw err;
  }
};

const deleteAllColorRecords = async () => {
  try {
    const res = await FastRecordModel.deleteMany({});
    return res;
  } catch (err) {
    console.error('Error deleting all color records:', err);
    throw err;
  }
};

const getPeriod = async () => {
  try {
    const colorPeriod = await FastRecordModel.findOne({}).sort({ _id: -1 }).lean().exec();
    if (!colorPeriod || isNaN(colorPeriod.period) || colorPeriod.period >= 999) {
      await deleteAllColorRecords();
      return 100;
    }
    return parseInt(colorPeriod.period) + 1;
  } catch (err) {
    console.error('Error fetching color period:', err);
    throw err;
  }
};

const createColorRecord = async (color, number) => {
  try {
    const period = await getPeriod();
    const currentTime = new Date();
    const newOrder = await FastRecordModel.create({ color, number, period, time: currentTime });
    return newOrder;
  } catch (err) {
    console.error('Error adding fast-parity new order:', err);
    throw err;
  }
};

module.exports = { createColorRecord, getColorRecords, deleteAllColorRecords };
