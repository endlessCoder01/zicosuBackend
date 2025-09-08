const alertService = require("../services/alertService");

const getAllAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getAlerts();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAlertsByJoin = async (req, res) => {
  try {
    const alerts = await alertService.getAlertsByJoin();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllAlertsByJoinId = async (req, res) => {
  const user_id = req.params.id
  try {
    const alerts = await alertService.getAlertsByJoinId(user_id);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAlertById = async (req, res) => {
  try {
    const alerts = await alertService.deleteAlertById(req.params.id);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAlert = async (req, res) => {
  try {
    const newAlert = await alertService.createAlert(req.body);
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAlerts,
  getAllAlertsByJoin,
  getAllAlertsByJoinId,
  createAlert,
  deleteAlertById,
};
