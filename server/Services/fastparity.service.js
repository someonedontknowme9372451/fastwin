// services/countdownService.js
const { FastRecordModel } = require('../Model/user.model');

const getCountdown = () => {
  const countDownDate = Date.now() / 1000;
  const distance = 30 - (countDownDate % 30);
  const minutes = Math.floor(distance / 60);
  const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
  return { minutes, seconds };
};

const updateColorRecord = async (color, number, period) => {
  try {
    const time = Date.now().toString();
    const createColorRecord = await FastRecordModel.create({ color, number, period, time });
    return createColorRecord;
  } catch (err) {
    console.error('Error updating color record:', err);
    throw err;
  }
};

const getColorRecords = async () => {
  try {
    const colorRecords = await FastRecordModel.find().sort({ _id: -1 }).exec();
    return colorRecords;
  } catch (err) {
    console.error('Error fetching color records:', err);
    throw err;
  }
};

const getColorPeriod = async () => {
  try {
    const colorPeriod = await FastRecordModel.findOne().sort({ _id: -1 }).exec();

    if (!colorPeriod || isNaN(colorPeriod.period)) {
      return 100;
    }
    if (parseInt(colorPeriod.period, 10) >= 999) {
      await deleteAllColorRecord();
    }

    const period = parseInt(colorPeriod.period, 10);
    return period;
  } catch (err) {
    console.error('Error fetching color period:', err);
    throw err;
  }
};

const deleteAllColorRecord = async () => {
  try {
    const res = await FastRecordModel.deleteMany({});
    return res;
  } catch (err) {
    console.error('Error deleting all color records:', err);
    throw err;
  }
};

const addNewOrder = async () => {
  try {
    const period = await getColorPeriod() + 1;
    const randomNum = Math.floor(Math.random() * 10);
    const color = randomNum % 2 === 0 ? 'red' : 'green';
    const newOrder = await FastRecordModel.create({
      color,
      number: randomNum.toString(),
      period,
      time: Date.now().toString(),
    });
    console.log('New fast-parity order added:', newOrder);
  } catch (err) {
    console.error('Error adding fast-parity new order:', err);
  }
};

const autoUpdateColorRecordTime = () => {
  const updateInterval = 1000;
  setInterval(async () => {
    try {
      const countdown = getCountdown();
      const seconds = parseInt(countdown.seconds);
      if (seconds === 10) {
      //  await addNewOrder();
      }
    } catch (err) {
      console.error('Error updating color records time:', err);
    }
  }, updateInterval);
};

autoUpdateColorRecordTime();

module.exports = { updateColorRecord, getColorRecords };
