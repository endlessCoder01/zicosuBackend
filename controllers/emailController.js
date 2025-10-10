const emailService = require("../services/emailService");

const getAllEmails = async (req, res) => {
  try {
    const emails = await emailService.getEmails();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteEmailById = async (req, res) => {
  try {
    const email = await emailService.deleteEmailById(req.params.id);
    res.json(email);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEmail = async (req, res) => {
  try {
    const newEmail = await emailService.createEmail(req.body);
    res.status(201).json(newEmail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
deleteEmailById,
createEmail,
getAllEmails,
};
