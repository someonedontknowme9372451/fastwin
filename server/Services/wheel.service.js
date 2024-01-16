const { wheelModal } = require('../Model/user.model');


const getCountdown = () => {
  const countDownDate = Date.now() / 1000;
  const distance = 30 - (countDownDate % 30);
  const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
  return { seconds };
};

const createRecord = async (color, period) => {
  try {
    const time = Date.now().toString();
    const create = await wheelModal.create({ color, period, time });
    console.log('New Wheel order added:', create);
    return create;
  } catch (err) {
    console.error('Error creating record:', err);
    throw err;
  }
};

const getRecord = async () => {
  try {
    const record = await wheelModal.findOne().sort({ _id: -1 }).exec();
    return record;
  } catch (err) {
    console.error('Error finding record:', err);
    throw err;
  }
};

const getWheelPeriod = async () => {
  try {
    const colorPeriod = await wheelModal.findOne().sort({ _id: -1 }).exec();
    if (!colorPeriod || isNaN(colorPeriod.period) || parseInt(colorPeriod.period, 10) >= 999) {
      return 100;
    }
    const period = parseInt(colorPeriod.period, 10);
    return period;
  } catch (err) {
    console.error('Error fetching color period:', err);
    throw err;
  }
};

const autoUpdateColorRecord = async() => {
  // Run the task every second 
    try {
      const countdown = getCountdown();
      const seconds = parseInt(countdown.seconds);
      if (seconds === 10 || seconds < 10) {
        const period = await getWheelPeriod() + 1;
        const color = 'red';
        await createRecord(color, period);
      }
    } catch (err) {
      console.error('Error updating color records time:', err);
    }
};

module.exports = { createRecord, getRecord,autoUpdateColorRecord };
