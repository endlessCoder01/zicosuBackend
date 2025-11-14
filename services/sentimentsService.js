const sentimentsModel = require("../models/sentimentsModel");

const getSentiments = async () => {
  return await sentimentsModel.getAllSentiments();
};

const getAllSentimentsWithUsers = async () => {
  return await sentimentsModel.getAllSentimentsWithUsers();
};

const deleteAll = async () => {
  return await sentimentsModel.deleteAll();
};

const getSentiment = async (id) => {
  const user = await sentimentsModel.getSentimentById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const getSentimentByReg = async (id) => {
  console.log(":::", id);
  const user = await sentimentsModel.getSentimentByReg(id);
  if (!user) throw new Error("User not found");
  return user;
};

const createSentiment = async (data) => {
  return await sentimentsModel.createSentiment(data);
};

const updateSentiment = async (id, updateData) => {
  console.log("look", id);
  console.log(updateData);
  return await sentimentsModel.updateSentiment(id, updateData);
};

module.exports = {
  getSentiment,
  getSentimentByReg,
  getSentiments,
  getAllSentimentsWithUsers,
  createSentiment,
  updateSentiment,
  deleteAll
};
