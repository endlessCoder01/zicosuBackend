const emailModel = require('../models/emailModel');

const getEmails = async () => {
  return await emailModel.getAllEmails();
};

const deleteEmailById = async (id) => {
  return await emailModel.deleteEmailById(id);
};

const createEmail = async (data) => {

    const existingEmail = await emailModel.getEmailByEmail(data.email);
    if (existingEmail) throw new Error("Email is already submitted");

  return await emailModel.createEmail(data);
};

module.exports = {
  createEmail,
  deleteEmailById,
  getEmails,
};
