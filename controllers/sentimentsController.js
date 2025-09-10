const sentimentsService = require('../services/sentimentsService');

const getAllSentiments= async (req, res) => {
  try {
    const sentiments = await sentimentsService.getSentiments();
    res.json(sentiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSentimentById = async (req, res) => {
  console.log("id", req.params.id)
  try {
    const user = await sentimentsService.getSentiment(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getSentimentByReg = async (req, res) => {
  console.log("id", req.params.id)
  try {
    const user = await sentimentsService.getSentimentByReg(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


const createSentiment = async (req, res) => {
  try {
    const newSentiment = await sentimentsService.createSentiment(req.body);
    res.status(201).json(newSentiment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const updateUser = async (req, res) => {
//   const userId = req.params.id
//   try {
//     const updateUser = await sentimentsService.updateUser(userId, req.body);
//     res.status(201).json(updateUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
createSentiment,
getAllSentiments,
getSentimentById,
getSentimentByReg
};
