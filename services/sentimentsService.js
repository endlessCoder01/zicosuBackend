const sentimentsModel = require('../models/sentimentsModel');

const getSentiments = async () => {
  return await sentimentsModel.getAllSentiments();
};

const getSentiment = async (id) => {
  const user = await sentimentsModel.getSentimentById(id);
  if (!user) throw new Error('User not found');
  return user;
};

const getSentimentByReg = async (id) => {
  const user = await sentimentsModel.getSentimentByReg(id);
  if (!user) throw new Error('User not found');
  return user;
};


const createSentiment = async (data) => {
  return await sentimentsModel.createSentiment(data);
};

// const updateUser = async (id, userData) => {
//   console.log("look",id);
//   console.log(userData)
//   return await sentimentsModel.updateUser(id, userData);
// };

module.exports = {
getSentiment,
getSentimentByReg,
getSentiments,
createSentiment,
};
