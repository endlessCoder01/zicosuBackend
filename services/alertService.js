const alertModel = require('../models/alertModel');

const getAlerts = async () => {
  return await alertModel.getAllAlerts();
};
const getAlertsByJoin = async () => {
  return await alertModel.getAllAlertsByJoin();
};
const getAlertsByJoinId = async (id) => {
  return await alertModel.getAllAlertsByJoin(id);
};

const deleteAlertById = async (id) => {
  return await alertModel.deleteAlertById(id);
};

const createAlert = async (alertData) => {
  return await alertModel.createAlert(alertData);
};

module.exports = {
  createAlert,
  getAlerts,
getAlertsByJoin,
getAlertsByJoinId,
deleteAlertById,
};
