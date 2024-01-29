const fastParityService = require('../Services/fastparity.service');

const handleResponse = (res, data, err) => {
  if (err || !data) {
    return res.status(500).json({
      data: '',
      err: err || 'Server error',
      success: false,
    });
  }
  return res.status(200).json({
    data,
    err: '',
    success: true,
  });
};

const createRecordResponse = async (req, res) => {
  try {
    const response = await fastParityService.createColorRecord(req.body.color, req.body.number);
    handleResponse(res, response);
  } catch (err) {
    handleResponse(res, null, err);
  }
};

const getRecordResponse = async (req, res) => {
  try {
    const response = await fastParityService.getColorRecords();
    handleResponse(res, response);
  } catch (err) {
    handleResponse(res, null, err);
  }
};

const deleteRecordsResponse = async (req, res) => {
  try {
    const response = await fastParityService.deleteAllColorRecords();
    handleResponse(res, response);
  } catch (err) {
    handleResponse(res, null, err);
  }
};

module.exports = { createRecordResponse, getRecordResponse, deleteRecordsResponse };
